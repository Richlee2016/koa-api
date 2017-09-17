const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;
const UserSchema = new Schema({
  // user admin superAdmin
  role: {
    type: String,
    default: "user"
  },
  openid: [String],
  unionid: String,
  nickname: String,
  address: String,
  province: String,
  country: String,
  city: String,
  gender: String,
  email: String,
  passsword: String,
  hashed_password: String,
  loginAttempts: {
    //登录次数记录
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: Number, //锁定次数
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

// 拿一个虚拟字段 判断是否 超过锁定期
UserSchema.virtual("isLocked").get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

UserSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

UserSchema.pre("save", function(next) {
  let user = this;
  if (!user.isModified("password")) {
    //是否更改
    return next();
  }
  // 加盐
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.passsword = hash;
      next();
    });
  });
});

UserSchema.methods = {
  // 密码验证
  comparePassword: function(_password, password) {
    return new Promise((resolve, reject) => {
      // 解盐
      bcrypt.compare(_password, password, function(err, isMatch) {
        if (!err) {
          resolve(isMatch);
        } else {
          reject(err);
        }
      });
    });
  },
  //   登录记录
  incLoginAttempts: function(user) {
    var that = this;
    return new Promise((resolve, reject) => {
      if (that.lockUntil && that.lockUntil < Date.now()) {
        that.update(
          {
            $set: {
              loginAttempts: 1
            },
            $unset: {
              lockUntil: 1
            }
          },
          function(err) {
            if (!err) resolve(true);
            else reject(err);
          }
        );
      }
      var updates = {
        $inc: {
          loginAttempts: 1
        }
      };
      if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
        updates.$set = {
          lockUntil: Date.now() + LOCK_TIME
        };
      }

      that.update(updates, err => {
        if (!err) resolve(true);
        else reject(err);
      });
    });
  }
};

const Users = mongoose.model("Users", UserSchema);
