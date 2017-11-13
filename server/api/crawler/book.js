import mongoose from "mongoose";
import { BookCrawler } from "../../crawler";
import tinytime from "tinytime";
const FreeBook = mongoose.model("t_book_free");

export const saveFreeBook = async (name, author,id) => {
  let res = await FreeBook.findOne({ name }).exec();
  const template = tinytime("{YYYY}{Mo}{DD}");
  const today = template.render(new Date());
  // 存在再判断是否需要更新(当天更新)
  if (res) {
    const { meta: { updateAt } } = res;
    const updateTime = template.render(updateAt);
    if (updateTime !== today) {
      res = await BookCrawler.search({ name, author });
      if (res) await FreeBook.saveBook(res,id);
    }
  } else {
    res = await BookCrawler.search({ name, author });
    if (res) await FreeBook.saveBook(res,id);
  }
  return res;
};
