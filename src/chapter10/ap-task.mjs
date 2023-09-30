import Task from "data.task";
import { curry } from "ramda";
import MyHttp from "./utils/MyHttp.mjs";

const renderPage = curry(function (destinations, events) {
  return {
    destinations,
    events,
  };
});

const r = Task.of(renderPage)
  .ap(MyHttp.get("/destinations"))
  .ap(MyHttp.get("/events"));

r.fork(
  function (error) {
    throw error;
  },
  function (data) {
    console.log(data);
  }
);
// console.log(r);
