import koaBody from "koa-bodyparser";
module.exports = app => {
  app.use(koaBody());
};
