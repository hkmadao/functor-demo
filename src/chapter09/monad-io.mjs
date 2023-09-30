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

//====================未使用join
//  cat :: String -> IO (IO String)
const cat = compose(map(print), readFile);

//  catFirstChar :: String -> IO (IO String)
const catFirstChar = compose(map(map(head)), cat);

const catFirstCharResult = catFirstChar("./data/note.text");

// 需要执行2次unsafePerformIO()
console.log(catFirstCharResult.unsafePerformIO().unsafePerformIO());
