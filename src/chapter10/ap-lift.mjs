import { compose, curry, curryN, map, prop } from "ramda";
import MyDocument from "./utils/MyDocument.mjs";

const IO = function (f) {
  this.unsafePerformIO = f;
};

IO.of = function (x) {
  return new IO(function () {
    return x;
  });
};
//
IO.prototype.map = function (f) {
  return new IO(compose(f, this.unsafePerformIO));
};
IO.prototype.ap = function (other) {
  //重要，不要写成：this.unsafePerformIO
  return other.map(this.unsafePerformIO());
};
// ==============
//  $ :: String -> IO DOM
const $ = function (selector) {
  return new IO(function () {
    // return document.querySelector(selector);
    // 模拟
    return MyDocument.querySelector(selector);
    // if (selector === "#username") {
    //   return { value: "admin" };
    // }
    // if (selector === "#password") {
    //   return { value: "123456" };
    // }
  });
};

//  getVal :: String -> IO String
const getVal = compose(map(prop("value")), $);

// Example:
// ===============
//  signIn :: String -> String -> Bool -> User
const signIn = curry(function (username, password, remember_me) {
  const user = {
    username: username,
    password: password,
    remember_me: remember_me,
  };
  /* signing in */
  return user;
});

//=================使用lift
//使用[ of/ap = map ]改写
const liftA2 = curry(function (f, functor1, functor2) {
  return functor1.map(f).ap(functor2);
});

const liftA3 = curry(function (f, functor1, functor2, functor3) {
  return functor1.map(f).ap(functor2).ap(functor3);
});

const r = liftA3(signIn, getVal("#username"), getVal("#password"), IO.of(false))
// IO({username: "admin", password: "123456", remember_me: false})
console.log(r.unsafePerformIO());
