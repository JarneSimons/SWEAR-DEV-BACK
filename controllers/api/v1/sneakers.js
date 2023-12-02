const Sneakers = require('../../../models/Sneakers');

// get sneakers from database
const getSneakers = async (req, res) => {
    try {
        const sneakers = await Sneakers.find();

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


// get getSneakerById from database with specific id
const getSneakerById = async (req, res) => {
    try {
        const sneakerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(sneakerId)) {
            return res.status(400).json({
                "status": "error",
                "message": "Invalid ObjectId format"
            });
        }

        const sneaker = await Sneakers.findById(sneakerId);

        if (!sneaker) {
            return res.status(404).json({
                "status": "error",
                "message": "Sneaker not found"
            });
        }

        res.json({
            "status": "success",
            "data": {
                "sneaker": sneaker
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "status": "error",
            "message": "Failed to get sneaker",
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


const updateSneaker = async (req, res) => {
    try {
        const sneakerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(sneakerId)) {
            return res.status(400).json({
                "status": "error",
                "message": "Invalid ObjectId format"
            });
        }

        const updatedSneaker = await Sneakers.findByIdAndUpdate(
            sneakerId,
            { $set: { status: req.body.status } },
            { new: true } // To return the updated document
        );

        if (!updatedSneaker) {
            return res.status(404).json({
                "status": "error",
                "message": "Sneaker not found"
            });
        }

        res.json({
            "status": "success",
            "data": {
                "sneaker": updatedSneaker
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "status": "error",
            "message": "Failed to update sneaker",
            "error": err
        });
    }
};



// delete sneakers from database with specific id
const mongoose = require('mongoose');
const deleteSneaker = async (req, res) => {
    try {
        const sneakerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(sneakerId)) {
            return res.status(400).json({
                "status": "error",
                "message": "Invalid ObjectId format"
            });
        }

        const deletedSneaker = await Sneakers.findByIdAndDelete(sneakerId);

        if (!deletedSneaker) {
            return res.status(404).json({
                "status": "error",
                "message": "Sneaker not found"
            });
        }

        res.json({
            "status": "success",
            "data": {
                "sneaker": deletedSneaker
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "status": "error",
            "message": "Failed to delete sneaker",
            "error": err
        });
    }
};


module.exports.getSneakers = getSneakers
module.exports.postSneakers = postSneakers
module.exports.updateSneaker = updateSneaker
module.exports.deleteSneaker = deleteSneaker
module.exports.getSneakerById = getSneakerById


