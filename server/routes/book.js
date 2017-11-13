import { controller, all, post, get, sayError } from "../decorator/router";
import { bookApi } from "../api";

@controller("/book_api")
export class Crawler {
  constructor() {}

  @get("/freebook/:id")
  async fetchFreeBook(ctx, next) {
    const { id } = ctx.params;
    const res = await bookApi.fetchFreeBook(id);
    if (res) {
      ctx.body = sayError(1, `《${res.name}》查询成功`, { data: res });
    } else {
      ctx.body = sayError(0, `《${res.name}》查询失败`, { data: "" });
    }
  }
}
