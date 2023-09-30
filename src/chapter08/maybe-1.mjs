import { compose, curry, map } from "ramda";

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

// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry(function (amount, account) {
  return account.balance >= amount
    ? Maybe.of({ balance: account.balance - amount })
    : Maybe.of(null);
});

// updateLedger :: x -> x
const updateLedger = (x) => {
  return x;
};

// remainingBalance :: Account -> String
const remainingBalance = (account) => {
  return account ? "Your balance is " + account.balance : null;
};

//  finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger);

//  getTwenty :: Account -> Maybe(String)
const getTwenty = compose(map(finishTransaction), withdraw(20));

console.log(getTwenty({ balance: 200 }));
