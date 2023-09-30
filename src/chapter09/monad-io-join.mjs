import fs from "fs";
import { compose, map, curry, head } from "ramda";

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const IO = function (f) {
  this.unsafePerformIO = f;
};

IO.of = function (x) {
  return new IO(function () {
    return x;
  });
};

IO.prototype.map = function (f) {
  return new IO(compose(f, this.unsafePerformIO));
};

//  readFile :: String -> IO String
const readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, "utf-8");
  });
};

//  print :: String -> IO String
const print = function (x) {
  return new IO(function () {
    console.log(x);
    return x;
  });
};

//====================使用join，将多层IO嵌套放置成一层
//  join :: Monad m => m (m a) -> m a
const join = function (mma) {
  return mma.join();
};

IO.prototype.join = function () {
  //重要，不要写成：return this.unsafePerformIO
  return this.unsafePerformIO();
};

//  cat :: String -> IO String
const cat = compose(join, map(print), readFile);

//  catFirstChar :: String -> IO String
const catFirstChar = compose(map(head), cat);

// 只需执行1次unsafePerformIO()
console.log(catFirstChar("./data/note.text").unsafePerformIO());
