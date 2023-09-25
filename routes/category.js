let express = require('express');
let app = express.Router()
let Category = require('../models/category')



app.get('/categories', async function(req,res) {
  try {
    let categories = await Category.find()
    res.send(categories)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/categories', async function(req,res){
  try{
    let category =  new Category(req.body)
    await category.save()
    res.send(category)
  }catch(error){
    res.status(500).send(error.message)
  }

})

app.put('/categories/:id', async function(req,res){
  try{
    let {id} = req.params;
    let category = await Category.findById(id)
    if(!category) return res.status(500).send({"msg":"category does not exist"})
    let data = category._doc
    category.overwrite({...data, ...req.body})
    category.save()
    res.send({"mesg":"category updated succesfully"})
  }catch(error){
    res.status(500).send(error.message)
  }
})

app.delete('/categories/:id', async function(req,res){
  try{
    let {id} = req.params;
    let category = await Category.findById(id)
    if(!category) return res.status({"msg":"category does not exist"});
    category.deleteOne()
    res.send({"msg":"category deleted successfully"})
  }catch(error) {
    res.status(500).send(error.message)
  }
})





module.exports = app