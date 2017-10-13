import { controller, all, post, get } from "../decorator/router";
import { movieCrawlerApi } from "../api";
import { BookCrawler,MovieCrawler } from "../crawler";

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

  @get("/one")
  async one(ctx,next){
    const res =await movieCrawlerApi.one();
    ctx.body = res;
  }
  // 电影更新
  @get("/movie_home")
  async crawlerMovieHome(ctx, next) {
    const res = await movieCrawlerApi.movie();
    ctx.body = {
      code: 1,
      data: res
    };
  }
  // 电影首页
  @get("/movie_page")
  async crawlerMoveIndex(ctx, next) {
    const res = await movieCrawlerApi.page();
    ctx.body = res;
  }

  
  // bilibili 搜索
  @get("/movie_bili")
  async crawlerMovieBili(ctx,next){
    const s = ctx.query.search;
    const res = await MovieCrawler.bili(s);
    if(res){
      ctx.body={
        code:1,
        data:res
      }
    }else{
      ctx.body={
        code:0,
        data:res
      }
    }
  }

  // 免费书城搜索
  @post("/book_search")
  async crawlerBookSearch(ctx, next) {
    const {name,author} = ctx.request.body;
    const res = await BookCrawler.search({ name, author});
    readNow = res;
    ctx.body = res;
  }
  // 免费书籍阅读
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
