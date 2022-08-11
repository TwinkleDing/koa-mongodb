const User = require('../db').User;
const sha1 = require('sha1');
const {
  PWD_ENCODE_STR
} = require('../utils/config');
const {
  create_token,
  check_token_code
} = require('../utils/token');
const xss = require('xss');

module.exports = {
  // 用户注册
  async register(ctx, next) {
    let {
      userName = '', userId = '', password = '', rePassword = '', avatar = "", code = '', code_token = ''
    } = ctx.request.body;
    try {
      if (userName == '' || userId == "" || password == "") {
        ctx.body = {
          code: 401,
          msg: "注册失败，请填写完整表单!"
        }
        return;
      }
      // if(avatar == ''){
      //   ctx.body = {
      //     code: 401,
      //     msg: "注册失败，请上传头像!"
      //   }
      //   return;
      // }
      if (password.length < 5) {
        ctx.body = {
          code: 401,
          msg: '注册失败，密码最少为5位！'
        }
        return;
      }
      if (password !== rePassword) {
        ctx.body = {
          code: 401,
          msg: "注册失败，2次密码输入不一致!"
        }
        return;
      }

      // // 验证码判断
      // let mark = await check_token_code({token:code_token,code});
      // if(!mark){
      //   ctx.body = {
      //     code: 401,
      //     msg: '登录失败，验证码错误!'
      //   }
      //   return;
      // }

      // 判断 userId 是否重复
      let res = await User.findOne({
        userId
      });
      if (res) {
        ctx.body = {
          code: 409,
          msg: '注册失败，登录账号重复了，换一个吧！'
        }
        return;
      }
      password = sha1(sha1(password + PWD_ENCODE_STR));
      // 防止xss攻击， 转义
      userName = xss(userName);
      let token = create_token(userId);
      let user = new User({
        userId,
        userName,
        password,
        avatar,
        token
      });
      res = await user.save();
      if (res._id != null) {
        ctx.body = {
          code: 200,
          msg: "注册成功!",
          data: {
            userName,
            avatar,
          }
        }
      } else {
        ctx.body = {
          code: 500,
          msg: "注册失败，服务器异常!"
        }
      }
    } catch (e) {
      console.error(e);
      ctx.body = {
        code: 500,
        msg: "注册失败，服务器异常！"
      }
    }
  },
  // 用户登录
  async login(ctx, next) {
    let {
      userId = '', password = '', code = "", code_token = ''
    } = ctx.request.body;
    try {
      if (userId == '' || password == '') {
        ctx.body = {
          code: 401,
          msg: "登录失败，请输入登录账号或密码!"
        }
        return;
      }
      // 验证码判断
      // let mark = await check_token_code({token:code_token,code});
      // if(!mark){
      //   ctx.body = {
      //     code: 401,
      //     msg: '登录失败，验证码错误!'
      //   }
      //   return;
      // }
      password = sha1(sha1(password + PWD_ENCODE_STR));
      let res = await User.findOne({
        userId,
        password
      });
      if (!res) {
        ctx.body = {
          code: 401,
          msg: '登录失败，用户名或者密码错误!'
        }
        return;
      }
      let token = create_token(userId);
      res.token = token;
      res.save();
      ctx.body = {
        code: 200,
        msg: "登录成功!",
        data: {
          userId: res.userId,
          userName: res.userName,
          avatar: res.avatar,
          token
        }
      }
    } catch (e) {
      console.error(e);
      ctx.body = {
        code: 500,
        msg: '登录失败，服务器异常!'
      }
    }
  },
  // 通过_id 获取用户信息
  async query(ctx, next) {
    let userId = ctx.query.userId;
    if (!userId.length) {
      ctx.body = {
        code: 401,
        msg: '查询失败，userId错误！'
      }
      return;
    }
    try {
      let res = await User.findOne({
        userId
      }, {
        avatar: true,
        userId: true,
        userName: true,
        sex: true,
        age: true,
        position: true,
        department: true,
      });
      ctx.body = {
        code: 200,
        msg: '查询成功！',
        data: res
      }
    } catch (e) {
      console.error(e);
      ctx.body = {
        code: 500,
        msg: '查询失败，服务器异常，请稍后再试!'
      }
    }
  },
  // 获取用户列表
  async getUser(ctx, next) {
    try {
      let query = ctx.query
      for (const key in query) {
        const element = query[key];
        if (element === '') {
          delete query[key];
        }
      }
      let res = await User.find(query);
      ctx.body = {
        code: 200,
        msg: '查询成功！',
        data: res
      }
    } catch (e) {
      console.error(e);
      ctx.body = {
        code: 500,
        msg: '查询失败，服务器异常，请稍后再试!'
      }
    }
  },
  async update(ctx, next) {
    let {
      userId = '',
        avatar = "",
        userName = "",
        age = "",
        sex = "",
        position = "",
        department = "",

    } = ctx.request.body;
    try {
      let user = await User.findOne({
        userId
      })
      if (user) {
        user.avatar = avatar;
        user.userName = userName;
        user.age = age;
        user.sex = sex;
        user.position = position;
        user.department = department;
        await user.save();
        ctx.body = {
          code: 200,
          msg: "修改成功!",
          data: {
            userId,
            avatar,
            userName,
            age,
            sex,
            position,
            department,
          }
        }
      } else {
        ctx.body = {
          code: 500,
          msg: "用户不存在，修改失败!"
        }
      }
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: e
      }
    }
  }
};