const express = require('express')
const app = express()
const port = 3000
const sneakersRouter = require('./routers/api/v1/sneakers')
const usersRouter = require('./routers/api/v1/users')
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONN).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});



//body parser
app.use(express.json());
//app use cors
const cors = require('cors');
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello Worldddd!')
})


app.use('/api/v1/sneakers', sneakersRouter)
app.use('/api/v1/users', usersRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = app;
