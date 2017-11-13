import mongoose from "mongoose";
const FreeBook = mongoose.model("t_book_free");
// 存更新免费书籍
export const fetchFreeBook= async (id) => {
  const res = await FreeBook.findOne({id});
  return res;
};

