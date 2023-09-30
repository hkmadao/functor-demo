import { compose, curry, map, prop, join } from "ramda";
import MyJquery from "./utils/MyJquery.mjs";

//================================
//Utils
const Impure = {
  getJson: curry((callback, url) => {
    MyJquery.getJson("./data/flickr.json", callback);
  }),
  setHtml: curry((rel, html) => {
    const body = `<${rel}>${html}</${rel}>`;
    console.log(body);
  }),
};

const img = (src) => {
  return MyJquery.toImg(src);
};

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});
//==================================

const url = (tag) => {
  return `http://localhost:8080/img/${tag}`;
};

//===============优化前
const mediaUrl = compose(prop("src"), prop("media"));

const srcs = compose(map(mediaUrl), prop("data"));

const images = compose(map(img), srcs);

const imgHtml = compose(join(""), images);

const renderImages = compose(
  Impure.setHtml("body"),
  trace("images datas: "),
  imgHtml
);

const app = compose(Impure.getJson(renderImages), url);

app("cat");
