const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 用户
let userSchema = new Schema({
    userName: String,
    userId: String,
    password: String,
    avatar: {
        type: String,
        default: ""
    },
    token: {
        type: String,
        default: ""
    }
})

module.exports = userSchema;