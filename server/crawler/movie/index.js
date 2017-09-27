import fs from "fs";
// 配置
import config from "./config";
// 请求封装
import { reqPromise, reqSuperAgent } from "../utils";
// 电影dom解析
import * as handle from "./handle";

const { reqUrl, reqApi } = config;

class MovieCrawler {
  constructor() {
    this.pageMap = new Map();
  }

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
    const data = await reqPromise({
      url: reqApi[0].api
    });
    console.log(data);
    return data;
  }

  async bili(s){
    const html=await reqPromise({
      url:reqUrl.bili(s)
    })
    const res =handle.biliParse(html);
    return res;
  }
}

export default new MovieCrawler();
