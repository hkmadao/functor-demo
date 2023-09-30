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
//====================使用chain，替代join/map将多层IO嵌套放置成一层

//  chain :: Monad m => (a -> m b) -> m a -> m b
const chain = curry(function (f, m) {
  return m.map(f).join(); // 或者 compose(join, map(f))(m)
});

IO.prototype.join = function () {
  //重要，不要写成：return this.unsafePerformIO
  return this.unsafePerformIO();
};

//  cat :: String -> IO String
const cat = compose(chain(print), readFile);

//  catFirstChar1 :: String -> IO String
const catFirstChar = compose(trace("trace "), map(head), cat);

console.log(catFirstChar("./data/note.text").unsafePerformIO());
