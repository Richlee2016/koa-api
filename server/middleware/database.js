import mongoose from "mongoose";
import config from "../config";
import fs from "fs";
import { resolve } from "path";
// 读取schema 文件
const models = resolve(__dirname, "../database/schema");
const r = path => resolve(__dirname, "../database/backup/", path);
fs
  .readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(resolve(models, file)));


module.exports = app => {
  mongoose.set("debug", true);
  mongoose.connect(config.db);

  mongoose.connection.on("disconnected", () => {
    mongoose.connect(config.db);
  });

  mongoose.connection.on("error", err => {
    console.error(err);
  });

  mongoose.connection.once("open", async () => {
    console.log("Connected to MongoDB", config.db);
  });
};
