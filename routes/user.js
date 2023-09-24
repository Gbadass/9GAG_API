let express = require('express');
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

app.post('/users', async function(req,res) {
  try {
    let user = new userModel(req.body)
    await user.save()
    res.send(user)
    
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = app;