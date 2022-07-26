const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 用户
let userSchema = new Schema({
    userName: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    department: {
        type: String,
        default: ""
    },
    position: {
        type: String,
        default: ""
    },
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