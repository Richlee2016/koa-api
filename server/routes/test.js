import { controller, all, post, get } from "../decorator/router";
@controller("/test")
export class Crawler {
  constructor() {}
  @get("/")
  async getMovieList(ctx, next) {
    ctx.body = 0;
  }
}
