const express = require('express')
const router = express.Router()

// get sneakers
router.get('/', (req, res) => {
    res.send('Get sneakers')
})

// post sneakers
router.post('/', (req, res) => {
    res.send('Post sneakers')
})

// update sneakers
router.put('/:id', (req, res) => {
    res.send('Put sneakers' + req.params.id)
})

// delete sneakers
router.delete('/:id', (req, res) => {
    res.send('Delete sneakers' + req.params.id)
})

module.exports = router