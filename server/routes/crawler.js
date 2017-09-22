import { controller, all, post, get } from "../decorator/router";
import { movieCrawlerApi } from "../api";
import { BookCrawler } from "../crawler";

let readNow = {
  book: {
    name: "一念永恒",
    href: "http://www.23us.cc/html/143/143021/",
    author: "耳根"
  }
};

@controller("/crawler")
export class Crawler {
  constructor() {}

  @get("/movie_home")
  async crawlerMovie(ctx, next) {
    const res = await movieCrawlerApi.movie();
    ctx.body = {
      code: 1,
      data: res
    };
  }

  @get("/movie_page")
  async crawlerMoveIndex(ctx, next) {
    const res = await movieCrawlerApi.page();
    ctx.body = res;
  }

  @get("/book_search")
  async crawlerBookSearch(ctx, next) {
    const res = await BookCrawler.search({ name: "一念永恒", author: "耳根" });
    readNow = res;
    ctx.body = res;
  }

  @get("/book_read/:id")
  async crawlerBookRead(ctx, next) {
    const id = ctx.params.id;
    if (readNow.book) {
      const readUrl = readNow.book.href + id + ".html";
      const res = await BookCrawler.read(readUrl);
      ctx.body = res;
    }
  }
}
