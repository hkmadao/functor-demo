import { compose, curry } from "ramda";

const toLowerCase = (x) => {
  return x.toLowerCase();
};

const replace = curry(function (what, replacement, str) {
  return str.replace(what, replacement);
});

// pointfree
const snakeCase = compose(replace(/\s+/gi, "_"), toLowerCase);

console.log(snakeCase("A B"));
