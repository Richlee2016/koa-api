const mongoose = require("mongoose");
const { Schema } = mongoose;
const Mixed = Schema.Types.Mixed
const MovieSchema = new Schema({
  name:String,
  list:Mixed,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

MovieSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

MovieSchema.statics = {
  async savePage(data){
    const {name,list} = data;
    let page =await this.findOne({name:name}).exec();
    const _page = {
      name,
      list
    }
    if(page){
      page.name = name;
      page.list = list;
    }else{
      page = new Page(_page);
    };

    try {
      await page.save();
      console.log(`${name}更新成功`);
    } catch (error) {
      console.log(`${name}更新失败`);
      console.log(error);
    }
    return data;
  }
}


const Page = mongoose.model("t_movie_page", MovieSchema);
