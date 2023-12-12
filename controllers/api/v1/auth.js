const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

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
        }, config.get('jwt.secret'));

        res.json({
            "status": "success",
            "data": {
                "token": token
            }
        })
    }).catch(error => {
        res.json({
            "status": "error"
        })
    });
};

const login = async (req, res) => {
    try {
        const user = await User.authenticate()(req.body.username, req.body.password);

        if (!user) {
            return res.json({
                "status": "error",
                "message": "Invalid username or password",
            });
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username  // Assuming username is the correct field for your model
        }, config.get('jwt.secret'));

        return res.json({
            "status": "success",
            "data": {
                "token": token
            }
        });
    } catch (error) {
        res.json({
            "status": "error",
            "message": "Invalid username or password",
        });
        console.log(error);
    } 
};

// changePassword
const changePassword = async (req, res) => {
    const user = await User.authenticate()(req.body.username, req.body.oldPassword).then(result => {
        // no user found
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