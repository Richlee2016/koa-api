import { writeFile, readFile } from "fs";
import reqPro from "request-promise";
import install from 'superagent-charset';
import reqSuper from 'superagent';
import cheerio from 'cheerio';
const superagent = install(reqSuper);

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

export const reqPromise =async (opt) => {
    const options = Object.assign({},opt,{json:true});
    try {
      const res =  await reqPro(options);
      return res;
    } catch (err) {
      console.error(err)
    }
}

export const reqSuperAgent = async (url) => {
  return new Promise((resolve, reject) => {
      superagent.get(url).charset('gb2312').end(function (err, res) {
          if (err) {
              reject(err);
          }
          if (res) {
              var $ = cheerio.load(res.text, { decodeEntities: false });
              resolve($);
          };
      });
  })
}

