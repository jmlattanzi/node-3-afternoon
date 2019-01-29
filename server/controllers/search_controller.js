const swag = require('../models/swag')

module.exports = {
    search: (req, res, next) => {
        if (!req.query.category) {
            res.status(200).json(swag)
        } else {
            let filtered = swag.filter(
                (item) => item.category === req.query.category
            )
            res.status(200).json(filtered)
        }
    },
}
