import install from 'superagent-charset';
import request from 'superagent';
import cheerio from 'cheerio';
import fs from 'fs';
import config from "./config"
import { movieParse } from './handle'
import { rq } from '../utils'

const { reqUrl, reqApi } = config

const superagent = install(request);

class MovieCrawler {
    constructor() {
        this.pageMap = new Map();
    }

    // 请求promise化
    async request(url) {
        return new Promise((resolve, reject) => {
            superagent.get(url).charset('gb2312').end(function (err, res) {
                if (err) {
                    reject(err);
                }
                if (res) {
                    var $ = cheerio.load(res.text, { decodeEntities: false });
                    resolve($);
                };
            });
        })
    }

    // 爬去电影
    async movie(id) {
        // 多网页爬取
        // let listArr = [];
        // for (var i = 0; i < 20; i++) {
        //     listArr.push(this.request(config.movie(id+i)));
        // }
        // const $ =await Promise.all(listArr);
        // const res = $.map((o,i) => movieParse(o,id+i));

        const $ = await this.request(reqUrl.movie(id))
        const res = movieParse($, id);
        return res;
    }

    // 首页爬取
    async page() {
        
        const data = await rq({
            url: reqApi.index
        })
        return data;
    }

}

export default new MovieCrawler();

