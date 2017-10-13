import Koa from "koa";
import { resolve } from "path";
const r = (...arg) => resolve(__dirname, ...arg);
const MIDDLEWARES = ["database","general", "router"];

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3006;

class App {
  constructor() {
    this.app = new Koa();
    this.useMiddleware(this.app)(MIDDLEWARES);
    this.errorHandling();
  }
  useMiddleware(app) {
    return m => {
      m.forEach(o => {
        require(`./middleware/${o}.js`)(app);
      });
    };
  }

  errorHandling() {
    this.app.on("error", (err, ctx) => {
      console.error("server error", err, ctx);
    });
  }

  start() {
    this.app.listen(port,host);
    console.log("Server listening on " + host + ":" + port);
  }
}

const app = new App();
app.start();
