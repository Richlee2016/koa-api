import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const transferSchema = new Schema({
    page:String,
    list:[]
})

const transfer = mongoose.model('t_transfer',transferSchema);