const checkSession = (req, res, next) => {
    console.log('at check session')
    if (!req.session.user) {
        req.session.user = { username: '', cart: [], total: 0 }
    }
    next()
}

module.exports = { checkSession }
