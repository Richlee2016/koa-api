import mongoose from "mongoose";
import { MovieCrawler } from "../../crawler";
import { readFile } from "fs";
import path from "path";
import xlsx from "xlsx";
import md5 from "md5";
const p = p => path.resolve(__dirname, p);
const Movie = mongoose.model("t_movie_home");
const Page = mongoose.model("t_movie_page");
const Transfer = mongoose.model("t_transfer");
const Online = mongoose.model("t_online_movie");
export const one = async () => {
  console.log(0);
  const res = await Movie.findOne({ id: 2 });
  console.log(res);
  return res;
};

// 更新最新电影
export const movie = async newestId => {
  const page = await Page.findOne({ name: "index" });
  if (page) {
    const { list: { banner } } = page;
    let maxId = Math.max.apply(Math, banner.map(o => Number(o.id)));
    const maxCount = await Movie.count({}).exec();
    // 如果选取的id大于了首页的最大值  并且这个id能够爬取到值
    if (newestId && newestId > maxId) {
      const newestMovie = await MovieCrawler.movie(newestId);
      if (newestMovie.name !== "none") {
        maxId = newestId;
      } else {
        return false;
      }
    }
    if (maxId > maxCount) {
      const more = await MovieCrawler.moreMovie(maxId, maxCount);
      try {
        const insert = Movie.insertMany(more);
        console.log("最新电影更新成功");
      } catch (error) {
        console.log("最新电影更新失败", error);
      }
      return more;
    } else {
      return "电影为最新资源";
    }
  }
};

// 爬取页面
export const page = async () => {
  const res = await MovieCrawler.page();
  let data;
  if (res.error_code === 0) {
    data = res.data;
    const isSave = await Page.savePage({ name: "index", list: data });
  }
  return res;
};

export const transfer = async () => {
  // const reg = /www\.dy280\.com\/vod\/(\d+)\.html/;
  // const workbook = xlsx.readFile(p("./mock/list.xlsx"));
  // const sheetNames = workbook.SheetNames;
  // const worksheet = workbook.Sheets[sheetNames[0]];
  // const myJson = xlsx.utils.sheet_to_json(worksheet);
  // let movieList= [];
  // myJson.forEach(o => {
  //     let arr = JSON.parse(o.list);
  //     let list = arr.map(l => {
  //         return l.match(reg)[1];
  //     })
  //   movieList = movieList.concat(list).sort((a,b) => {
  //     return a-b;
  //   });
  // });
  //   Transfer.insertMany(myJson);
  const workbook = xlsx.readFile(p("./mock/movie.xlsx"));
  const sheetNames = workbook.SheetNames;
  const worksheet = workbook.Sheets[sheetNames[0]];
  const myJson = xlsx.utils.sheet_to_json(worksheet);
  Online.insertMany(myJson);
  return 0;
};
