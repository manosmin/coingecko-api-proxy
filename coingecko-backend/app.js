const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const coinsRouter = require('./controllers/coins')

const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use('/coins', coinsRouter)

module.exports = app