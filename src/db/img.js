const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 图片
let imgSchema = new Schema({
    id: {
        type: String,
        default: ""
    },
    filePath: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
})

module.exports = imgSchema;