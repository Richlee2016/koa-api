import mongoose from "mongoose";
const Online = mongoose.model("t_online_movie");

//查询列表
export const fetchList = async p => {
  const page = Number(p.page) || 1;
  const size = Number(p.size) || 10;
  const area = p.area;
  const type = p.type;
  const year = Number(p.year);
  const actor = p.actor;
  const director = p.director;
  const mySearch = () => {
    let arr = [];
    if (area) arr.push({ area });
    if (type) arr.push({ type });
    if (year) arr.push({ year });
    if (actor) arr.push({ actor });
    if (director) arr.push({ director });
    return arr;
  };
  let allSearch = {};
  if (mySearch().length > 0) {
    allSearch = Object.assign({}, { $and: mySearch() });
  }
  let skip = (page - 1) * size;
  try {
    const counts = await Online.count(allSearch).exec();
    const movielist = await Online.find(allSearch)
      .sort({ id: -1 })
      .limit(size)
      .skip(skip)
      .exec();
    return {
      list: movielist,
      count: counts
    };
  } catch (error) {
    console.log("列表查询错误");
    console.log(error);
  }
};

export const fetchOnline = async id => {
  try {
    return await Online.findOne({ id }).exec();
  } catch (error) {
    console.log("电影查询错误");
    console.log(error);
  }
};
