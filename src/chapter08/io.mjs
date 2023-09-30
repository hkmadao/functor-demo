import { compose, map, split, last, filter, equals, head } from "ramda";

const Maybe = function (value) {
  this.__value = value;
};

Maybe.prototype.map = function (f) {
  return Maybe.of(f(this.__value));
};

Maybe.prototype.isNothing = function () {
  return this.__value === null || this.__value === undefined;
};

Maybe.of = function (x) {
  return new Maybe(x);
};

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

////// 纯代码库: lib/params.js ///////

//  url :: IO String
const url = new IO(function () {
  //   return window.location.href;
  //模拟副作用
  return "http://localhost/sys/user/login?username=admin&password=123456";
});

//  toPairs =  String -> [[String]]
const toPairs = compose(map(split("=")), split("&"));

//  params :: String -> [[String]]
const params = compose(toPairs, last, split("?"));

//  findParam :: String -> IO Maybe [String]
const findParam = function (key) {
  return map(compose(Maybe.of, filter(compose(equals(key), head)), params), url );
};

////// 非纯调用代码: main.js ///////

// 调用 unsafePerformIO() 来运行它！
const username = findParam("username").unsafePerformIO();

console.log(username);

//1.有2个或以上不纯的操作时如何操作
