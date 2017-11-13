import mongoose from "mongoose";
const Oauth = mongoose.model("t_oauth_user");

export const saveUser = async (openid,qqInfo) => {
    const res = await Oauth.saveOauth(openid,qqInfo);
};

export const fetchUser = async (openid) => {
    return await Oauth.findOne({openid}).exec();
};