const express = require('express')
const Primus = require('primus');
const http = require('http');
const app = express()
const port = 3000
require('dotenv').config()

//body parser
app.use(express.json());
//app use cors
const cors = require('cors');
app.use(cors());

//server connection for websocket primus
const server = http.createServer(app);
const primus = new Primus(server, { transformer: 'websockets'});
require('./primus/primus').go(server);


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONN).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

const sneakersRouter = require('./routers/api/v1/sneakers')
const usersRouter = require('./routers/api/v1/users')



server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})  


app.get('/', (req, res) => {
  res.send('Hello Worldddd!')
})


app.use('/api/v1/sneakers', sneakersRouter)
app.use('/api/v1/users', usersRouter)



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



module.exports = app;
