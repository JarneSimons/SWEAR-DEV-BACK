const createError = require('http-errors');
const express = require('express');
const path = require('path');
//const logger = require('morgan');
const cors = require("cors");
//const cookieParser = require('cookie-parser');
const passport = require('./passport/passport');
const getRawBody = require('raw-body');
const bodyParser = require('body-parser');


//routers
const indexRouter = require('./index');
const usersRouter = require('./routers/api/v1/users');
const sneakersRouter = require('./routers/api/v1/sneakers');

//mongoose connection
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

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
//app.use(logger('dev'));
app.use(express.json);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));

//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/sneakers', sneakersRouter);
// app.use('/api/v1/sneakers', passport.authenticate('jwt', {
//   session: false
// }), sneakersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err : {};

    //render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;