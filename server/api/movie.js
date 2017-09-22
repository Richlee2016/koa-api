import mongoose from "mongoose";
import * as movieApi from "./crawler/movie";
const Movie = mongoose.model("t_movie_home");
const Page = mongoose.model("t_movie_page");

// 查询电影详情
export const movie = async id => {
  try {
    let movie = Movie.findOne({ id }).exec();
    if (!movie) {
      // 爬取最新电影并储存
      const more = await movieApi.movie(id);
      movie = more.pop();
    }
    console.log("查询成功");
    return movie;
  } catch (e) {
    console.log("查询失败");
  }
};
// 查询电影首页
export const page = async () => {
  try {
    let page = Page.findOne({ name: "index" }).exec();
    console.log("查询成功");
    return page;
  } catch (e) {
    console.log("查询失败");
  }
};

// 查询电影列表
export const movieList = async p => {
  const page = Number(p.page) || 1;
  const size = p.size || 21;
  const catalog = p.catalog;
  const classify = p.classify;
  const area = p.area;
  const year = Number(p.year);
  const mySearch = () => {
    let arr = [];
    arr.push({ score: 0 });
    if (year) arr.push({ year });
    if (classify) arr.push({ classify });
    if (catalog) arr.push({ catalog });
    if (area) arr.push({ area });
    return arr;
  };
  let skip = (page - 1) * size;
  try {
    const counts = await Movie.count({
      name: { $ne: "none" },
      $and: mySearch()
    }).exec();
    const movielist = await Movie.find({
      name: { $ne: "none" },
      $and: mySearch()
    })
      .sort({ _id: -1 })
      .limit(size)
      .skip(skip)
      .exec();
    return {
      list:movielist,
      count:counts
    };
  } catch (error) {
    console.log("列表查询错误");
    console.log(error);
  }
};
