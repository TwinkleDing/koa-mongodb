const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 图片
let imgSchema = new Schema({
  id: String,
  filePath: String,
  content: String,
})

module.exports = imgSchema;