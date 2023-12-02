const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sneakersSchema = new Schema({
    "name": String,
    "size": Number,
    "user": String,
    "color": String,
});

const Sneakers = mongoose.model('Sneakers', sneakersSchema);


const getSneakers = (req, res) => {
    // res.send('Get sneakers')
    res.json({
        "status": "success",
        "message": "GETTING sneakers",
    })
}

const postSneakers = async (req, res) => {
    try {
        let sneakers = new Sneakers();
        sneakers.name = "SWEAR sneaker london";
        sneakers.size = 40;
        sneakers.user = "Jarne Simons";
        sneakers.color = "white";

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


