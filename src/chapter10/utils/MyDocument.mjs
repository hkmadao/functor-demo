import fs from "fs";

const MyDocument = {
  querySelector: (selector) => {
    const filename = "./data/" + selector.substring(1) + ".json";
    const valueText = fs.readFileSync(filename, "utf-8");
    return JSON.parse(valueText);
  },
};

export default MyDocument;
