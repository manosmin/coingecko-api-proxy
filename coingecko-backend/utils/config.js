const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const PORT = process.env.PORT || 3001
const API_KEY = process.env.COINGECKO_API_KEY

module.exports = { PORT, API_KEY }
