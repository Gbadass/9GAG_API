const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
  category_id:{type:String, required:true,ref:"categories"},
  user_id:{type:String, required:true,ref:"users"},
  title:{type:String, required:true},
  body:{type:String, required:true},
  img:{type:String},
  tag:{type:String},
  created_at:{type:Date,default:() =>Date.now()},
  modified_at:{type:Date,default:() =>Date.now()}

})

const Post = mongoose.model('post',PostSchema);
module.exports = Post