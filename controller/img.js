const Img = require('../db').Img;
const xss = require("xss");

module.exports = {
    // 上传图片
    async upload(ctx, next) {
        let { content = '' } = ctx.request.body;
        console.error(ctx)
        try {
            let date = new Date().getTime()
            let filePath ='http://localhost:3333/api/upload/'+date
            let comment = new Img({
                id: date,
                filePath,
                content
            });
            let res = await comment.save();
            if(res._id != null){
                ctx.body = {
                    code: 200,
                    msg: '上传成功！',
                    data: res,
                }
                }else{
                ctx.body = {
                    code: 500,
                    msg: '上传失败，服务器异常，请稍后再试!'
                }
            }
        } catch (e){
            console.error(e);
            ctx.body = {
                code: 500,
                msg: '上传失败，服务器异常，请稍后再试!'
            }
        }
    },
    // 读取图片
    async getFile(ctx, next) {
        let id = ctx.url.split('/')[3]
        try {
            let res = await Img.findOne({id})
            let imgs = res.content
            if(res._id != null){
                ctx.body = `<img src=${imgs} />`
            }else{
                ctx.body = {
                    code: 500,
                    msg: '查看失败，服务器异常，请稍后再试!',
                    data: res,

                }
            }
        } catch (e){
            console.error(e);
            ctx.body = {
                code: 500,
                msg: '查看失败，服务器异常，请稍后再试!'
            }
        }
    },
  
}