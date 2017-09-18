import { controller, all, post, get } from "../decorator/router";
import {movieCrawlerApi} from "../api"

@controller("/crawler")
export class Crawler {
  constructor() { }

  @get("/movie_home")
  async crawlerMovie(ctx, next) {
    const res = await movieCrawlerApi.movie();
    ctx.body = {
      code:1,
      data:res
    };
  }

  @get("/movie_page")
  async crawlerMoveIndex(ctx,next){
    const res = await movieCrawlerApi.page();
    ctx.body = res;
  }
  
}
