const Sneakers = require('../../../models/Sneakers');

// get sneakers from database
const getSneakers = async (req, res) => {
    try {
        // Extract properties from the request query (changed from body)
        const {
            username,
            email,
            size,
            laces_color,
            inside_color,
            outside_1_color,
            outside_2_color,
            outside_3_color,
            sole_bottom_color,
            sole_top_color,
            laces_texture,
            inside_texture,
            outside_1_texture,
            outside_2_texture,
            outside_3_texture,
            sole_bottom_texture,
            sole_top_texture,
            price
        } = req.query; // Use req.query to get parameters from the URL query string

        // Create a query object with the provided properties
        const query = {
            username,
            email,
            size,
            laces_color,
            inside_color,
            outside_1_color,
            outside_2_color,
            outside_3_color,
            sole_bottom_color,
            sole_top_color,
            laces_texture,
            inside_texture,
            outside_1_texture,
            outside_2_texture,
            outside_3_texture,
            sole_bottom_texture,
            sole_top_texture,
            price,
        };

        // Remove undefined or null properties from the query object
        Object.keys(query).forEach(key => query[key] == null && delete query[key]);

        // Find sneakers based on the query
        const sneakers = await Sneakers.find(query);

        // Check if no sneakers are found
        if (sneakers.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No sneakers found for the given username"
            });
        }

        res.json({
            status: "success",
            data: {
                sneakers
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Failed to get sneakers",
            error: err
        });
    }
};

// get getSneakerById from database with specific id
const getSneakerById = async (req, res) => {
    try {
        const sneakerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(sneakerId)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid ObjectId format"
            });
        }

        const sneaker = await Sneakers.findById(sneakerId);

        if (!sneaker) {
            return res.status(404).json({
                status: "error",
                message: "Sneaker not found"
            });
        }

        res.json({
            status: "success",
            data: {
                sneaker
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Failed to get sneaker",
            error: err
        });
    }
};



// post sneakers to database
const postSneakers = async (req, res) => {
    try {
        const {
            username,
            email,
            size,
            laces_color,
            inside_color,
            outside_1_color,
            outside_2_color,
            outside_3_color,
            sole_bottom_color,
            sole_top_color,
            laces_texture,
            inside_texture,
            outside_1_texture,
            outside_2_texture,
            outside_3_texture,
            sole_bottom_texture,
            sole_top_texture,
            price,
            statusShoe,
            date
        } = req.body;

        const sneakers = new Sneakers({
            username,
            email,
            size,
            laces_color,
            inside_color,
            outside_1_color,
            outside_2_color,
            outside_3_color,
            sole_bottom_color,
            sole_top_color,
            laces_texture,
            inside_texture,
            outside_1_texture,
            outside_2_texture,
            outside_3_texture,
            sole_bottom_texture,
            sole_top_texture,
            price,
            statusShoe,
            date
        });

        const savedSneakers = await sneakers.save();

        res.json({
            status: "success",
            data: {
                sneakers: savedSneakers
            }
        });
    } catch (error) {
        handlePostError(res, error, "Failed to save sneakers");
    }
};

const handlePostError = (res, error, message) => {
    console.error(error);
    res.status(500).json({
        status: "error",
        message,
        error: error.message
    });
};


const updateSneaker = async (req, res) => {
    try {
        const sneakerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(sneakerId)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid ObjectId format"
            });
        }

        // Extract properties from the request body
        const {
            username,
            email,
            size,
            laces_color,
            inside_color,
            outside_1_color,
            outside_2_color,
            outside_3_color,
            sole_bottom_color,
            sole_top_color,
            laces_texture,
            inside_texture,
            outside_1_texture,
            outside_2_texture,
            outside_3_texture,
            sole_bottom_texture,
            sole_top_texture,
            price,
            statusShoe,
            date
        } = req.body;

        // Create an object with the provided properties for updating
        const updateObject = {
            username,
            email,
            size,
            laces_color,
            inside_color,
            outside_1_color,
            outside_2_color,
            outside_3_color,
            sole_bottom_color,
            sole_top_color,
            laces_texture,
            inside_texture,
            outside_1_texture,
            outside_2_texture,
            outside_3_texture,
            sole_bottom_texture,
            sole_top_texture,
            price,
            statusShoe,
            date
        };

        // Remove undefined or null properties from the update object
        Object.keys(updateObject).forEach(key => updateObject[key] == null && delete updateObject[key]);

        const updatedSneaker = await Sneakers.findByIdAndUpdate(
            sneakerId,
            { $set: updateObject },
            { new: true } // To return the updated document
        );

        if (!updatedSneaker) {
            return res.status(404).json({
                status: "error",
                message: "Sneaker not found"
            });
        }

        res.json({
            status: "success",
            data: {
                sneaker: updatedSneaker
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Failed to update sneaker",
            error: err
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
                status: "error",
                message: "Invalid ObjectId format"
            });
        }

        const deletedSneaker = await Sneakers.findByIdAndDelete(sneakerId);

        if (!deletedSneaker) {
            return res.status(404).json({
                status: "error",
                message: "Sneaker not found"
            });
        }

        res.json({
            status: "success",
            data: { sneaker: deletedSneaker }
        });
    } catch (err) {
        handleServerError(res, err, "Failed to delete sneaker");
    }
};


module.exports.getSneakers = getSneakers
module.exports.postSneakers = postSneakers
module.exports.updateSneaker = updateSneaker
module.exports.deleteSneaker = deleteSneaker
module.exports.getSneakerById = getSneakerById


