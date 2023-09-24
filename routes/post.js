let express = require('express')
let app = express.Router()
let userModel = require('../models/post')

app.get('/posts', async function (req,res) {
  try {
    let posts = await userModel.find()
    res.send(posts)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = app