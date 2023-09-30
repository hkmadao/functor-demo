import fs from "fs";
import { compose, map, curry, head } from "ramda";

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const Maybe = function (value) {
  this.__value = value;
};

Maybe.prototype.map = function (f) {
  return Maybe.of(f(this.__value));
};

Maybe.prototype.isNothing = function () {
  return this.__value === null || this.__value === undefined;
};

Maybe.prototype.join = function() {
  return this.isNothing() ? Maybe.of(null) : this.__value;
}
Maybe.of = function (x) {
  return new Maybe(x);
};

//  safeProp :: Key -> {Key: a} -> Maybe a
var safeProp = curry(function(x, obj) {
  return new Maybe(obj[x]);
});

//  safeHead :: [a] -> Maybe a
var safeHead = safeProp(0);

//  join :: Monad m => m (m a) -> m a
var join = function(mma){ return mma.join(); }

//  firstAddressStreet :: User -> Maybe Street
var firstAddressStreet = compose(
  join, map(safeProp('street')), join, map(safeHead), safeProp('addresses')
);

const f = firstAddressStreet(
  {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
);

// Maybe({name: 'Mulburry', number: 8402})

console.log(f.__value)
