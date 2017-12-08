const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const OauthSchema = new Schema({
  openid: String,
  qqInfo: Object,
  limit:{ //权限系统  1~100  100最高权限(在下 Rich Lee 有何贵干！ (￣_,￣ ) )
    type:Number,
    default:1
  },
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

OauthSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

OauthSchema.statics = {
  async saveOauth(openid,qqInfo) {
    console.log(openid,qqInfo);
    let oauth = await this.findOne({ openid }).exec();
    const now = Date.now();
    const oneMonth = 1000 * 60 * 60 * 24 * 30;
    let _oauth = {
      openid,
      qqInfo
    };
    if (oauth) {
        if(now - oauth.meta.updateAt.getTime() > oneMonth){
            console.log("更新");
            oauth.qqInfo = qqInfo;
        }else{
            console.log("验证");
            return;
        };
    } else{
        console.log("保存");
        oauth = new Oauth(_oauth);
    }

    try {
      const res = await oauth.save(_oauth);
    } catch (error) {
      console.log(error);
    }
  }
};

const Oauth = mongoose.model("t_oauth_user", OauthSchema);
