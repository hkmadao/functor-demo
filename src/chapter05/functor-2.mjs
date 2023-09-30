import { compose, curry } from "ramda";

const toLowerCase = (x) => {
  return x.toLowerCase();
};

const replace = curry(function (what, replacement, str) {
  return str.replace(what, replacement);
});

//=============以下特性第10章的ap会使用到

const reg = compose(replace, function () {
  return /\s+/gi;
});

//注意是reg()
const rep = compose(reg(), function () {
  return "_";
});

const r = compose(rep(), toLowerCase);

console.log(r("A B"));
