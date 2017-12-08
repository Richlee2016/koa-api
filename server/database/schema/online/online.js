const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onlineSchema = new Schema({
  id: Number,
  img: String,
  name: String,
  update:{
      type:Date,
      default: Date.now()
  },
  director:String,
  actor:[],
  area:String,
  type:String,
  language:String,
  year:Number,
  intro:String,
  play:[],
  downUrl:[],
  introduce:String,
  same:[]
});

const online = mongoose.model("t_online_movie", onlineSchema);
