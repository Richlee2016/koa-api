import { controller, all, post, get, del, sayError } from "../decorator/router";
import { bookApi, oauthApi } from "../api";
import Oauth from "../oauth";
import qs from "querystring";
const oauthTest = new Oauth();
@controller("/oauth")
export class OauthSet {
  constructor() {}
  @get("/qq")
  async fetchQQ(ctx, next) {
    const { code, state } = ctx.query;
    const token = await oauthTest.fetchAccessToken(code);
    const { access_token } = qs.parse(token);
    const openID = await oauthTest.fetchOpenId(access_token);
    const reg = /callback\(|\)|;/g;
    const openidStr = openID.replace(reg, "");
    const { openid } = JSON.parse(openidStr);
    const userInfo = await oauthTest.getUserInfo(access_token, openid);
    const res = await oauthApi.saveUser(openid, userInfo);
    ctx.body = oauthTest.redirectUrl(`${state}#${openid}`);
  }

  @get("/users/:openid")
  async getUserId(ctx, next) {
    console.log(openid);
    let { openid } = ctx.params;
    const sessionOauth = ctx.session.oauth;
    if (openid === "no") {
      openid = "";
    }
    let user;
    if (openid && !sessionOauth) {
      ctx.session.oauth = openid;
      user = await oauthApi.fetchUser(openid);
    } else {
      user = await oauthApi.fetchUser(sessionOauth);
    }
    if (user) {
      ctx.body = sayError(1, "登录成功", { data: user.qqInfo });
    } else {
      ctx.body = sayError(0, "登录失败", { data: "" });
    }
  }

  @del("/users")
  async delUser(ctx, next) {
    ctx.session = null;
    ctx.body = sayError(1, "登出成功", { data: "" });
  }

  @get("/users")
  async getUsers(ctx, next) {
    const { page, size } = ctx.query;
    const res = await oauthApi.fetchUsers(page, size);
    if (res && res.length <= 0) {
      ctx.body = sayError(2, "没有用户", { data: [] });
    }
    if (res) {
      ctx.body = sayError(1, "获取成功", { data: res });
    } else {
      ctx.body = sayError(0, "获取失败", { data: "" });
    }
  }
}
