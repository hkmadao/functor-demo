import { compose, curry } from "ramda";

const toLowerCase = (x) => {
  return x.toLowerCase();
};

const firstToUpper = (x) => {
  return x.substring(0, 1).toUpperCase() + x.substring(1);
};

const replacement = (match) => {
  return match.replace("_", " ").toUpperCase();
};

var replace = curry(function (what, replacement, str) {
  return str.replace(what, replacement);
});

// pointfree
var sayHello = compose(
  replace(/_+./gi, replacement),
  firstToUpper,
  toLowerCase
);

console.log(sayHello("hEllo_wOrld!"));
