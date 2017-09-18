import mongoose from 'mongoose'
import { MovieCrawler } from "../../crawler"
const Movie = mongoose.model("t_movie_home");
const Page = mongoose.model("t_movie_page");

// 更新最新电影
export const movie = async () => {
    // const more =await MovieCrawler.movie(23991);
    // console.log(more);
    // return more;

    const page = await Page.findOne({name:'index'});
    if(page){
        const {list:{banner}} = page;
        const maxId = Math.max.apply(Math,banner.map(o => Number(o.id)));
        const maxCount =await Movie.count({}).exec();
        if(maxId > maxCount){
            const more =await MovieCrawler.moreMovie(maxId,maxCount);
            try {
                const insert =await Movie.insertMany(more).exec();
                console.log("最新电影更新成功");
            } catch (error) {
                console.log("最新电影更新失败");
                console.log(error);
            }
            return more;
        }else{
            return '电影为最新资源'
        };
    }
}

// 爬取页面
export const page = async () => {
    const res = await MovieCrawler.page();
    let data;
    if(res.error_code === 0){
        data = res.data;
    };
    const isSave = await Page.savePage({name:'index',list:data})
    return res;
}