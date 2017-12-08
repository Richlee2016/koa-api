import { controller, all, post, get,sayError } from "../decorator/router";
import { movieCrawlerApi,bookCrawlerApi } from "../api";
import { BookCrawler,MovieCrawler } from "../crawler";

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
    if (res) {
      ctx.body = sayError(1, `首页抓取成功`, { data: res });
    } else {
      ctx.body = sayError(0, `首页抓取失败`, { data: "" });
    }
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
    const {name,author,id} = ctx.request.body;
    const res = await bookCrawlerApi.saveFreeBook(name,author,id);
    if(res){
      ctx.body = sayError(1,`${name}免费资源`,{data:res});
    }else{
      ctx.body = sayError(0,`无${name}免费资源`,{data:""});
    };
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

  @get("/panda_transfer")
  async pandaTransfer(ctx,next){
    const res = await movieCrawlerApi.transfer();
    ctx.body = res;
  }
}
