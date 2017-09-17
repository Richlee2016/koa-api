import { controller, all, post, get } from "../decorator/router";
import { MovieCrawler } from "../crawler"
@controller("/crawler")
export class Crawler {
  constructor() { }

  @get("/movie_home")
  async crawlerMovie(ctx, next) {
    const html = await MovieCrawler.movie(2);
    ctx.body = html;
  }

  @get("/movie_index")
  async crawlerMoveIndex(ctx,next){
    const res = await MovieCrawler.page();
    ctx.body = res;
  }
}
