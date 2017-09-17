const mongoose = require('mongoose')
const { Schema } = mongoose

const MovieSchema = new Schema({
    _id:Number,
    movieId:Number,
    name:String,
    score:Number,
    area:String,
    othername:String,
    img:String,
    imdb:String,
    intro:String,
    classify:[String],
    catalog:[String],
    actor:[String],
    director:[String],
    year:Number,
    isFinish:String,
    url:[[]],
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
})

MovieSchema.pre('save',function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
      } else {
        this.meta.updateAt = Date.now()
      }
      next()
})

MovieSchema.statics = {
    async movieSave(movie){
        const isExist = await this.findOne({_id:movie.id}).exec()
        if(isExist){
            console.log(`${id}已经存在`)
            return;
        }else{
            const _movie = new Movie(movie)
        };
        try {
            await _movie.save()
            console.log(`${id}储存成功`);
        } catch (e) {
            console.log(`${id}储存失败`);
            console.log(e)
        }
    }
}

const Movie = new mongoose.model("t_movie_home",MovieSchema)