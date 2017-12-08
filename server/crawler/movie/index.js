import fs from "fs";
// 配置
import config from "./config";
// 请求封装
import { reqPromise, reqSuperAgent, Graphql } from "../utils";
// 电影dom解析
import * as handle from "./handle";
import md5 from 'md5'
const { reqUrl, reqApi } = config;

class MovieCrawler {
  constructor() {}

  // 爬去单个电影
  async movie(id) {
    const $ = await reqSuperAgent(reqUrl.movie(id));
    const res = handle.movieParse($, id);
    return res;
  }

  // 多电影爬取
  async moreMovie(max, min) {
    let moreArr = [];
    for (var i = min + 1; i <= max; i++) {
      moreArr.push(reqSuperAgent(reqUrl.movie(i)));
    }
    try {
      const domS = await Promise.all(moreArr);
      const moreRes = domS.map((o, i) => handle.movieParse(o, min + i + 1));
      console.log(`爬取(${min + 1}~${max})最新电影成功`);
      return moreRes;
    } catch (error) {
      console.log("爬取最新电影失败");
    }
  }

  // 单页爬取
  async page() {
    try {
      const data = await reqPromise({
        url: reqApi[0].api
      });
      return data;
    } catch (error) {
      console.log("首页爬取出错!", error);
    }
  }

  async bili(s) {
    s = encodeURIComponent(s);
    const html = await reqPromise({
      url: reqUrl.bili(s)
    });
    const res = handle.biliParse(html);
    return res;
  }
  
  async transfer(id,query) {
    const key = "44e9bd3958-ZjM0Y2VjOW";
    const secret = "M0NGU5YmQzOTU4OT-96596065ccf34ce";
    const timestamp = Math.floor(Date.now() / 1000);
    const sign = md5(key + timestamp + secret);
    console.log(timestamp);
    try {
      const res = await reqPromise({
        uri: `http://graphql.shenjian.io/?user_key=${key}&timestamp=${timestamp}&sign=${sign}&source_id=${id}&query=${query}`
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MovieCrawler();
