import fs from "fs";
import Task from "data.task";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MyHttp = {
  get: (uri) => {
    return new Task(async function (_, resolve) {
      console.log("before: " + uri);
      //模拟耗时操作
      await sleep(2000);
      console.log("after: " + uri);
      const filename = "./data/" + uri.substring(1) + ".json";
      const valueText = fs.readFileSync(filename, "utf-8");
      return resolve(JSON.parse(valueText));
    });
  },
};

export default MyHttp;
