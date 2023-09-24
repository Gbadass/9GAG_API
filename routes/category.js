let express = require('express');
let app = express.Router()
let userModel = require('../models/category')

app.get('/categories', async function(req,res) {
  try {
    let categories = await userModel.find()
    res.send(categories)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = app