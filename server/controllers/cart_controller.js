const swag = require('../models/swag')

module.exports = {
    get: (req, res, next) => {
        res.json(req.session.user.cart)
    },

    add: (req, res, next) => {
        const item = req.session.user.cart.findIndex(
            (item) => item.id === req.query.id
        )

        // why does this act so weird any other way i try it?!
        if (item === -1) {
            const swagItem = swag.find((item) => item.id == req.query.id)
            console.log(swagItem)
            req.session.user.cart.push(swagItem)
            req.session.user.total += swagItem.price
        }

        res.status(200).json(req.session.user)
    },

    delete: (req, res, next) => {
        const item = req.session.user.cart.find(
            (item) => item.id == req.query.id
        )
        if (item) {
            const index = req.session.user.cart.findIndex(
                (item) => item.id === req.query.id
            )

            req.session.user.cart.splice(index)
            req.session.user.total -= item.price
        }

        res.status(200).json(req.session.user)
    },

    checkout: (req, res, next) => {
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).json(req.session.user)
    },
}
