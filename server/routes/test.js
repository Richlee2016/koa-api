import { controller, all, post, get } from "../decorator/router";
import request from 'request'
import fs from 'fs'
@controller("/test")
export class Crawler {
  constructor() {}
  @get("/")
  async getMovieList(ctx, next) {
    
    // var options = {
    //   method: "GET",
    //   url:"https://i0.hdslb.com/bfs/archive/376f7ef1e1e1f79aa145e2db6ae2b056554a1ce4.jpg@320w_200h.webp",
    //   headers:{
    //     "Referer": "https://search.bilibili.com/all?keyword=%E5%A4%A7%E6%8A%A4%E6%B3%95&from_source=banner_search"
    //   }
    // };
    // const go = request(options).pipe(fs.createWriteStream('ddddd.jpg'));
    // ctx.body = go;
  }
}
