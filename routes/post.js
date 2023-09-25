let express = require('express')
let app = express.Router()
let Post = require('../models/post')
let Category = require('../models/category')
let userModel = require('../models/user')

app.get('/posts',async function (req,res) {
  try {
    let posts = await Post.find().populate("user_id category_id")
    res.json(posts)
  } catch (error) {
    res.status(500).send(error.message)
  }
})


app.get('/posts/:id', async function(req,res){
  try {
    let {id} = req.params;
    let post = await Post.findById(id);
    res.send(post)
  } catch (error) {
    res.status(500).send(error.message)
  }
})


app.post('/posts', async function(req,res){
  try{
    let {user_id,category_id} = req.body;
    let category = await Category.findById(category_id)
    let user = await userModel.findById(user_id)
    if(!user) return res.status(404).send({msg:"user does not exist"})
    if(!category) return res.status(404).send({msg:"category does not exist"})

    let post = new Post(req.body)
    await post.save()
    res.send(post)
  }catch(error){
    res.status(500).send(error.message)
  }
})

app.put("/posts/:id", async function(req,res){
  try {
    let {id} = req.params;
    let post = await Post.findById(id);
    if(!post) return res.status(500).send({"msg":"post does not exist"});
    let data = post._doc;
    post.overwrite({...data, ...req.body});
    post.save()
    res.send({"msg":"updated succesfully"})
  } catch (error) {
    res.send(500).send(error.message)
  }
}) 


app.delete('/posts/:id', async function (req,res){
  try {
    let {id} = req.params;
    let post = await Post.findById(id)
    if(!post) return res.status(500).send({"msg":"post does not exist"});
    post.deleteOne()
    res.send({"msg":"post deleted succesfully"})
  } catch (error) {
    res.send(error.message)
  }
})




module.exports = app