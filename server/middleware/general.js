import bodyparser from "koa-bodyparser";
import json from "koa-json";
import onerror from "koa-onerror";
import logger from "koa-logger";
import {resolve} from 'path'

const r = (...arg) => resolve(__dirname,...arg)

module.exports = app => {
  app.use(
    bodyparser({
      enableTypes: ["json", "form", "text"]
    })
  );
  app.use(json());
  // app.use(logger());

  // logger
  app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
};
