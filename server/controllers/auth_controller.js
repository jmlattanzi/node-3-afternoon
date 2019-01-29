const users = require('../models/users')
let id = 1

module.exports = {
    login: (req, res, next) => {
        const { username, password } = req.body

        if (
            users.filter(
                (user) =>
                    user.username === username && user.password === password
            )
        ) {
            req.session.user.username = username
            res.status(200).json(users)
        } else {
            res.status(500).json({ err: 'User not found' })
        }
    },

    register: (req, res, next) => {
        users.push({
            id,
            username: req.body.username,
            password: req.body.password,
        })

        req.session.user.username = req.body.username
        id++

        res.status(200).json(req.session.user)
    },

    signout: (req, res, next) => {
        req.session.destroy()
        res.json(req.session)
    },

    getUser: (req, res, next) => {
        res.status(200).json(req.session.user)
    },
}
