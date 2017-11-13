import Router from "koa-router";
import glob from "glob";
import { resolve } from "path";
import _ from "lodash";

export let routersMap = new Map();
export const symbolPrefix = Symbol("prefix");
export const isArray = c => (_.isArray(c) ? c : [c]);

export class Route {
  constructor(app, apiPath) {
    this.app = app;
    this.apiPath = apiPath;
    this.router = new Router();
  }

  init() {
    glob.sync(resolve(this.apiPath, "./*.js")).forEach(require);
    for (let [conf, controller] of routersMap) {
      const { target, path, method } = conf;
      const url = target[symbolPrefix] + path;
      const controllers = isArray(controller);
      this.router[method](url, ...controllers);
      // console.log(method,url);
    }
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}

export const controller = path => target => {
  target.prototype[symbolPrefix] = path;
};

export const route = opt => (target, key, descriptor) => {
  routersMap.set(
    {
      target,
      ...opt
    },
    target[key]
  );
};

export const get = path =>
  route({
    method: "get",
    path
  });

export const post = path =>
  route({
    method: "post",
    path
  });

export const del = path =>
  route({
    method: "delete",
    path
  });

export const put = path =>
  route({
    method: "put",
    path
  });

export const all = path =>
  route({
    method: "all",
    path
  });

export const sayError = (code, message, mixin) => {
    if (message) console.log(message);
    return Object.assign({}, { code, message }, mixin);
};
