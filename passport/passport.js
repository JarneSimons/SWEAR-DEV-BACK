const passport = require('passport');
const User = require('../models/User');
const config = require('config');
require('dotenv').config();

passport.use(User.createStrategy());

const JwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.uid);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;


// const passport = require('passport');
// const User = require('../models/User');
// const config = require('config');

// passport.use(User.createStrategy());

// let jwtStrategy = require('passport-jwt').Strategy;
// let extractJwt = require('passport-jwt').ExtractJwt;

// let jwtOptions = {};

// jwtOptions.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = config.get('jwt.secret');

// passport.use(new jwtStrategy(jwtOptions, async (jwt_payload, done) => {
//     User.findOne({ _id: jwt_payload.uid }, (err, user) => {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user)
//         } else {
//             return done(null, false);
//         }
//     })
// }));

// module.exports = passport;