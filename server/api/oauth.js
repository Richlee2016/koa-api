import mongoose from "mongoose";
import { Number } from "core-js/library/web/timers";
const Oauth = mongoose.model("t_oauth_user");
import _ from 'lodash'
// 储存 user
export const saveUser = async (openid,qqInfo) => {
    try {
        const res = await Oauth.saveOauth(openid,qqInfo);
    } catch (error) {
        console.log(error);
    }
};

//  查询单个 user
export const fetchUser = async (openid) => {
    try {
        return await Oauth.findOne({openid}).exec();
    } catch (error) {
        console.log(error);
    }
};

// 查询所有 user
export const fetchUsers = async (page = 1,size = 20) => {
    let p = page,
        s = size;
    if(_.isString(p)) p = Number(p);
    if(_.isString(s)) s = Number(s);
    let skip = (p - 1) * s;
    try {
        const res = await Oauth.find({})
        .limit(size)
        .skip(skip)
        .exec();
        return res;
    } catch (error) {
        console.log(error);
    }
};