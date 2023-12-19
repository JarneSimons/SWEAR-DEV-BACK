const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { use } = require('passport');

const signup = async (req, res, next) => {
    let username = req.body.username; // UI of postman
    let password = req.body.password;


    const user = new User({
        username: username
    });
    await user.setPassword(password);
    await user.save().then(result => {
        //console.log(result);

        let token = jwt.sign({
            uid: result._id,
            username: result.username
        }, process.env.JWT_SECRET);

        res.json({
          status: "success",
          data: {
            token: token,
          },
        });
    }).catch(error => {
        res.json({
            "status": "error"
        })
    });
};

const login = async (req, res, next) => {
    const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
        // console.log(result.user.username);
        // console.log(result.user._id);
        // console.log(result.user.password);
        if (!result.user) {
            return res.json({
                "status": "failed",
                "message": "Login failed"
            })
        }

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username
        }, process.env.JWT_SECRET);

        return res.json({
            "status": "success",
            "data": {
                "token": token
            }
        });
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        })
    });
};


// changePassword
const changePassword = async (req, res) => {
    const user = await User.authenticate()(req.body.username, req.body.oldPassword).then(result => {
        // console.log(req.body.username);
        // console.log(req.body.oldPassword);
        // console.log(req.body.newPassword);

        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        // check if user exists
        if (!username || !oldPassword || !newPassword) {
            return res.json({
                "status": "error",
                "message": "Please fill in all fields"
            })
        }

        
        if (!result.user) {
            return res.json({
                "status": "error",
                "message": "User not found"
            })
        }

        
        // user found
        result.user.setPassword(req.body.newPassword, async (err, user) => {
            if (err) {
                return res.json({
                    "status": "error",
                    "message": "Error changing password"
                })
            }
            await user.save().then(result => {
                res.json({
                    "status": "success",
                    "message": "Password changed"
                })
            }).catch(error => {
                res.json({
                    "status": "error",
                    "message": "Error changing password"
                })
            });
        });
    }).catch(error => {
        res.json({
            "status": "error",
            "message": "Invalid username or password"
        })
    });
}


module.exports.signup = signup;
module.exports.login = login;
module.exports.changePassword = changePassword;