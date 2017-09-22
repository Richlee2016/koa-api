// 配置
import config from "./config";
// 请求封装
import { reqPromise, reqSuperAgent } from "../utils";

const { dingDianSearch } = config;

import * as handle from './handle'

class BookCrawler {
  constructor() {

  }

  async search(book){ 
    try {
      const searchHtml = await reqPromise({
        uri:dingDianSearch(book.name)
      });
      const searchRes = handle.search(searchHtml,book.author);
      if(searchRes.href){
        const chapterHtml = await reqPromise({
          uri:searchRes.href
        });
        const chapterRes = handle.chapter(chapterHtml);
        return {
          chapter:chapterRes,
          book:searchRes
        };
      };
      return "没有搜索到免费目录"
    } catch (error) {
      console.log(error);
      return "抓取免费目录错误"
    }
  }
  
  async read(url){
    try {
      const readHtml = await reqPromise({uri:url});
      const readRes = handle.read(readHtml);
      return readRes;
    } catch (error) {
      console.log(error);
      return "抓取免费章节错误"
    }
  }

}

export default new BookCrawler();
