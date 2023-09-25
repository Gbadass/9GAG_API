let express = require('express');
const user = require('../models/user');
let app = express.Router();
let userModel = require('../models/user')

app.get('/users', async function(req,res) {
  try {
    let users = await userModel.find();
    res.send(users)
  } catch (error) {
    res.status(500).send(error.message)
  }

})

app.post('/users/auth', async function(req,res) {
  try {
    let {email,password} = req.body
    let user = await userModel.findOne({email,password})
    if(!user) return res.json({"msg":"Invalid credentials"})
    res.send({"msg":"login succesfull"})
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/users', async function(req,res) {
  try {
    let user = new userModel(req.body)
    await user.save()
    res.send(user)
    
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/users/:id', async function(req,res) {
  try {
    let {id} = req.params
    let user = await userModel.findById(id)
    res.send(user)

  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.put('/users/:id', async function(req, res){
  try {
    let {id} = req.params
    let user = await userModel.findById(id)
    if(!user) return res.status(500).json({"msg":"user does not exit"})
    let data = user._doc
    user.overwrite({...data, ...req.body})
    user.save()
    res.send({"msg": "update successfully", code:200})
  } catch (error) {
    res.send(error.message)
  }
})

app.delete('/users/:id', async function(req,res) {
  try {
    let {id} = req.params
    let user = await userModel.findById(id)
    if(!user) return res.status(500).json({"msg": "user does not exist"})
    user.deleteOne()
    res.send({"msg":"user deleted succesfully"})
  } catch (error) {
    res.send(500).send(error.message)
  }
})


module.exports = app;