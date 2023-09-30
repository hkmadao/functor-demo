import fs from "fs";

const MyJquery = {
  getJson: (url, callback) => {
    fs.readFile(url, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      callback(JSON.parse(data.toString()));
    });
  },
  toImg: (src) => {
    return `<img src='${src}' />`
  }
};

export default MyJquery;
