import { controller, get, sayError } from "../decorator/router";
import { movieApi } from "../api";
@controller("/movie_api")
export class Crawler {
  constructor() {}

  // 所有电影
  @get("/movies")
  async getMovieList(ctx, next) {
    const p = ctx.query;
    const res = await movieApi.movieList(p);
    if (res) {
      ctx.body = sayError(1, "获取电影", { data: res });
    } else {
      ctx.body = sayError(1, "获取失败", { data: "" });
    }
  }

  // 单个电影
  @get("/movies/:id")
  async getMovie(ctx, next) {
    const { id } = ctx.params;
    const res = await movieApi.movie(id);
    if (res) {
      ctx.body = sayError(1, "获取电影", { data: res });
    } else {
      ctx.body = sayError(1, "获取失败", { data: "" });
    }
  }

  // 获取首页
  @get("/page")
  async getPage(ctx, next) {
    const res = await movieApi.page();
    if (res) {
      ctx.body = sayError(1, "获取首页", { data: res });
    } else {
      ctx.body = sayError(1, "获取失败", { data: "" });
    }
  }
}
