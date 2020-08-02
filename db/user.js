const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
// 用户
let userSchema = new Schema({
    user_name: String,
    user_id: String,
    user_pwd: String,
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
