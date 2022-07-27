const xss = require("xss");
const Img = require('../db').Img;
const User = require('../db').User;

module.exports = {
    // 上传头像
    async upload(ctx, next) {
        let token = ctx.get("Authorization");
        let file = ctx.request.files.file
        let user = await User.findOne({
            token
        });
        try {
            if (file.filepath) {
                // 将图片添加到 个人信息中
                user.avatar = file.filepath
                user.save();
                ctx.body = {
                    code: 200,
                    msg: '上传成功！'
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: '上传失败，服务器异常，请稍后再试!'
                }
            }
        } catch (e) {
            console.error(e);
            ctx.body = {
                code: 500,
                msg: '上传失败，服务器异常，请稍后再试!',
                data: e
            };
        }
    },
    // 读取图片
    async getFile(ctx, next) {
        let id = ctx.url.split('/')[3];
        try {
            let res = await Img.findOne({
                id
            })
            let imgs = res.content
            if (res._id != null) {
                ctx.body = `<img src=${imgs} />`
            } else {
                ctx.body = {
                    code: 500,
                    msg: '查看失败，服务器异常，请稍后再试!',
                    data: res,

                }
            }
        } catch (e) {
            console.error(e);
            ctx.body = {
                code: 500,
                msg: '查看失败，服务器异常，请稍后再试!'
            }
        }
    },
};