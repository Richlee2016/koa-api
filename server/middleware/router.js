import { Route } from "../decorator/router";
import { resolve } from "path";

const r = path => resolve(__dirname, path);

module.exports = app => {
  const apiPath = r("../routes");
  const routes = new Route(app, apiPath);
  routes.init();
};
