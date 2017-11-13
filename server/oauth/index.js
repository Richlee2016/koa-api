import qs from "querystring";
import request from "request-promise";
const baseUrl = "https://graph.qq.com";
const config = {
  appID: 101435375,
  appKey: "91c323460e027125cdeef61365ca86f3",
  token: baseUrl + "/oauth2.0/token",
  openID: baseUrl + "/oauth2.0/me",
  get_user_info: baseUrl + "/user/get_user_info"
};

export default class Oauth {
  constructor() {}

  async fetchAccessToken(code) {
    const sendData = {
      grant_type: "authorization_code",
      client_id: config.appID,
      client_secret: config.appKey,
      code,
      redirect_uri: encodeURI("http://173gg43187.iok.la/oauth/qq")
    };
    const res = await request({
      uri: `${config.token}?${qs.stringify(sendData)}`,
      json: true
    });
    return res;
  }

  async fetchOpenId(access_token) {
    const res = await request({
      uri: `${config.openID}?access_token=${access_token}`,
      json: true
    });
    return res;
  }

  async getUserInfo(access_token, openid) {
    const sendData = {
      access_token,
      oauth_consumer_key: config.appID,
      openid
    };
    const res = await request({
      uri: `${config.get_user_info}?${qs.stringify(sendData)}`,
      json: true
    });
    return res;
  }

  redirectUrl(state) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <script>
          location.href = '${decodeURIComponent(state)}'
        </script>
        <body>
        </body>
      </html>
      `;
  }
}
