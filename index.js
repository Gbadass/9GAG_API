let express = require('express')
let mongoose = require('mongoose')
let app = express()
require('dotenv').config()

let user = require('./routes/user')
let post = require('./routes/post')
let category = require('./routes/category')

let PORT = process.env.PORT
let CON_STR = process.env.MONGO_URL

mongoose.connect(CON_STR,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

mongoose.connection.on('open', () => console.log('sever connected'));
mongoose.connection.on('error', (e) => console.log(e));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1',user)
app.use('/api/v1', post)
app.use('/api/v1', category)

app.listen(PORT)
console.log('app is running on port ' + PORT)
