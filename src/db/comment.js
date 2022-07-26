const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 留言
let commentSchema = new Schema({
    userId: {
        type: String,
        default: ""
    },
    userName: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        default: ""
    },
    create_time: {
        type: String,
        default: Date.now
    }
})

module.exports = commentSchema;