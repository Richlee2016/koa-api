// 配置
import config from "./config";
import { sayError } from "../../config/error";
// 请求封装
import { reqPromise, reqSuperAgent } from "../utils";

const { dingDianSearch } = config;

import * as handle from "./handle";

class BookCrawler {
  constructor() {}

  async search(book) {
    try {
      const searchHtml = await reqPromise({
        uri: dingDianSearch(book.name)
      });
      const searchRes = handle.search(searchHtml, book.author);
      if (searchRes) {
        const chapterHtml = await reqPromise({
          uri: searchRes.href
        });
        const chapterRes = handle.chapter(chapterHtml);
        return {
          name:searchRes.name,
          author:searchRes.author,
          href:searchRes.href,
          chapter: chapterRes
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async read(url) {
    try {
      const readHtml = await reqPromise({ uri: url });
      const readRes = handle.read(readHtml);
      return readRes;
    } catch (error) {
      console.log(error);
      return "抓取免费章节错误";
    }
  }
}

export default new BookCrawler();
