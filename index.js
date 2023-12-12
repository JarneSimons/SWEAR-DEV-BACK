// var express = require('express');
// var router = express.Router();

// router.get('/', function (req, res){
//   res.render('index', {
//     title: 'Sneaker cofigurator'
//   });
// });



const express = require('express')
const app = express()
const port = 3000
const sneakersRouter = require('./routers/api/v1/sneakers')
const usersRouter = require('./routers/api/v1/users')

const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://127.0.0.1:27017/sneakers',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'sneakers'
  }
).then(() => {
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
