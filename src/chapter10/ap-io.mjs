import { compose, curry, map, prop } from "ramda";
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

const r = IO.of(signIn)
  .ap(getVal("#username"))
  .ap(getVal("#password"))
  .ap(IO.of(false));
// IO({username: "admin", password: "123456", remember_me: false})
console.log(r.unsafePerformIO());
