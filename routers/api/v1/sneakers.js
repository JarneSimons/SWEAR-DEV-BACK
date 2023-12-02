const express = require('express')
const router = express.Router()
const controllerSneakers = require('../../../controllers/api/v1/sneakers')

// get sneakers
router.get('/', controllerSneakers.getSneakers)

// post sneakers
router.post('/', controllerSneakers.postSneakers)

// update sneakers
router.put('/:id', controllerSneakers.updateSneaker)

// delete sneakers
router.delete('/:id', controllerSneakers.deleteSneaker)

// get details of a sneaker with specific id
router.get('/:id', controllerSneakers.getSneakerById)

module.exports = router