const express = require('express')
const app = express()
const port = 3000
const sneakersRouter = require('./routers/api/v1/sneakers')

app.get('/', (req, res) => {
  res.send('Hello Worldddd!')
})

app.use('/api/v1/sneakers', sneakersRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})