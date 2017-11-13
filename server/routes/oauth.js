import { controller, all, post, get, sayError } from "../decorator/router";
import { bookApi, oauthApi } from "../api";
import Oauth from "../oauth";
import qs from "querystring";
const oauthTest = new Oauth();
@controller("/oauth")
export class OauthSet {
  constructor() {}

  @get("/qq")
  async qq(ctx, next) {
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

  @get("/test")
  async test(ctx, next) {
    ctx.session.user = {
      id: 2
    };
    // console.log(ctx.session)
    // console.log(ctx.session.openid);
    ctx.body = 0;
  }

  @get("/login")
  async login(ctx, next) {
    const { openid } = ctx.query;
    const sessionOauth = ctx.session.oauth;
    let user;
    if (openid && !sessionOauth) {
      ctx.session.oauth = openid ;
      user = await oauthApi.fetchUser(openid);
    } else {
      user = await oauthApi.fetchUser(sessionOauth);
    }
    if(user){
      ctx.body = sayError(1,"登录成功",{data:user.qqInfo});
    }else{
      ctx.body = sayError(0,"登录失败",{data:""});
    };
  }
  @get("/logout")
  async logout(ctx, next) {
    ctx.session = null;
    ctx.body = sayError(1,"登出成功",{data:""});
    
  }
}
