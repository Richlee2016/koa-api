import { writeFile, readFile } from "fs";
import request from "request";

export const writeFileAsync = (src, data) => {
  return new Promise((resolve, reject) => {
    writeFile(src, data, function (err, res) {
      if (err) reject(err);
      resolve("save success");
    });
  });
};

export const readFileAsync = (src, type = "UTF-8") => {
  return new Promise((resolve, reject) => {
    readFile(src, type, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export const rq =async (opt) => {
    const options = Object.assign({},opt,{json:true});
    try {
      const res =  await request(options);
      return res;
    } catch (err) {
      console.error(err)
    }
}
