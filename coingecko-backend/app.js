const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./utils/config')
const coinsRouter = require('./controllers/coins')
const path = require('path')

const app = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use('/api/coins', coinsRouter)

if (config.NODE_ENV === 'production') {
  app.use(express.static('dist'))
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  })
}

module.exports = app