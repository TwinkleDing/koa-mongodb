const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// 留言
let commentSchema = new Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    user_name: String,
    avatar: {
        type: String,
        default: ""
    },
    content: String,
    create_time: {
        type: String,
        default: Date.now
    }
  })

module.exports = commentSchema;
