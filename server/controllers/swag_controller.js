const swag = require('../models/swag')

module.exports = {
    read: (req, res, next) => {
        console.log('at swag controller')
        res.status(200).send(swag)
    },
}
