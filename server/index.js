require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const session = require('express-session')
const { checkSession } = require('./middlewares/checkForSession')
const sc = require('./controllers/swag_controller')
const auth = require('./controllers/auth_controller')
const cc = require('./controllers/cart_controller')
const search = require('./controllers/search_controller')

const app = express()

app.use(json())
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)
app.use(checkSession)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', sc.read)
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)

app.get('/api/cart', cc.get)
app.post('/api/cart', cc.add)
app.post('/api/cart/checkout', cc.checkout)
app.delete('/api/cart', cc.delete)

app.get('/api/search', search.search)

const port = process.env.SERVER_PORT || 3000
app.listen(port, console.log(`Listening on port ${port}...`))
