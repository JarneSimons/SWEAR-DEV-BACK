const express = require('express')
const router = express.Router()
const controllerSneakers = require('../../../controllers/api/v1/sneakers')
const passport = require('../../../passport/passport')

// get sneakers
router.get('/', passport.authenticate('jwt', {session: false}), controllerSneakers.getSneakers)

// post sneakers
router.post('/', controllerSneakers.postSneakers)

// update sneakers
router.put('/:id', passport.authenticate('jwt', {session: false}), controllerSneakers.updateSneaker)

// delete sneakers
router.delete('/:id', passport.authenticate('jwt', {session: false}), controllerSneakers.deleteSneaker)

// get details of a sneaker with specific id
router.get('/:id', controllerSneakers.getSneakerById)

module.exports = router