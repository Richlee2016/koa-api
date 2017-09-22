import { controller, all, post, get } from "../decorator/router";
import { movieApi } from "../api";
@controller("/movie_api")
export class Crawler {
  constructor() {}

  @get("/list")
  async getMovieList(ctx, next) {
    const p = ctx.query;
    const res = await movieApi.movieList(p);

    if (res) {
      ctx.body = {
        code: 1,
        data: res
      };
    } else {
      ctx.body = {
        code: 0,
        data: "查询错误"
      };
    }
  }

  @get("/movie/:id")
  async getMovie(ctx, next) {
    const { id } = ctx.params;
    const res = await movieApi.movie(id);
    ctx.body = {
      code: 1,
      data: res
    };
  }

  @get("/page")
  async getPage(ctx, next) {
    const res = await movieApi.page();
    if (res) {
      ctx.body = {
        code: 1,
        data: res
      };
    } else {
      ctx.body = {
        code: 0,
        data: "查询错误"
      };
    }
  }
}
