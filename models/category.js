const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  name:{type:String,required:true},
  created_at:{type:Date,default:() =>Date.now()},
  modified_at:{type:Date,default:() =>Date.now()}
})

const Category = mongoose.model('categories',CategorySchema);
module.exports = Category