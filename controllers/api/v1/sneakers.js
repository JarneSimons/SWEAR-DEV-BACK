const getSneakers = (req, res) => {
    res.send('Get sneakers')
}

const postSneakers = (req, res) => {
    res.send('Post sneakers')
}

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


