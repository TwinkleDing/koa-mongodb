const xss = require("xss");
const Img = require('../db').Img;

module.exports = {
    // 上传头像
    async upload(ctx, next) {
        let file = ctx.request.files.file
        let filePath = 'http://' + ctx.header.host + "/images/" + file.newFilename

        try {
            if (file.filepath) {
                ctx.body = {
                    code: 200,
                    msg: '上传成功！',
                    data: filePath
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