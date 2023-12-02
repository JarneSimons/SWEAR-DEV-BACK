const Sneakers = require('../../../models/Sneakers');


const getSneakers = async (req, res) => {
    try {
        const sneakers = await Sneakers.find({ user: "Jarne Simons" });

        res.json({
            "status": "success",
            "data": {
                "sneakers": sneakers
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "status": "error",
            "message": "Failed to get sneakers",
            "error": err
        });
    }
};

// post sneakers to database
const postSneakers = async (req, res) => {
    try {
        let sneakers = new Sneakers();
        sneakers.name = req.body.name;
        sneakers.email = req.body.email;
        sneakers.size = req.body.size;
        sneakers.user = req.body.user;
        sneakers.color = req.body.color;

        const savedSneakers = await sneakers.save();

        res.json({
            "status": "success",
            "data": {
                "sneakers": savedSneakers
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "status": "error",
            "message": "Failed to save sneakers",
            "error": err
        });
    }
};


const updateSneaker = (req, res) => {
    res.send('Update sneakers' + req.params.id)
}

const deleteSneaker = (req, res) => {
    res.send('Delete sneakers' + req.params.id)
}



module.exports.getSneakers = getSneakers
module.exports.postSneakers = postSneakers
module.exports.updateSneaker = updateSneaker
module.exports.deleteSneaker = deleteSneaker


