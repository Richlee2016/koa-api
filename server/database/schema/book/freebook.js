const mongoose = require("mongoose");
const { Schema } = mongoose;
const sayError = (code, message, mixin) => {
  if (message) console.log(message);
  Object.assign({}, { code, message, mixin });
};
const FreeBookSchema = new Schema({
  id: Number,
  name: String,
  author: String,
  href: String,
  chapter: [],
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

FreeBookSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

FreeBookSchema.statics = {
  async saveBook(data, id) {
    console.log(id);
    const { name, author, href, chapter } = data;
    let book = await this.findOne({ name }).exec();
    const _book = {
      id: id,
      name,
      author,
      href,
      chapter
    };
    if (book) {
      book.id = id;
      book.name = name;
      book.author = author;
      book.href = href;
      book.chapter = chapter;
    } else {
      book = new FreeBook(_book);
    }
    try {
      const res = await book.save();
    } catch (error) {
      console.log(error);
    }
  }
};

const FreeBook = mongoose.model("t_book_free", FreeBookSchema);
