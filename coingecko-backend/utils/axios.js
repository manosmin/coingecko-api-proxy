const axios = require('axios')
const config = require('../utils/config')

const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'x-cg-demo-api-key': config.API_KEY
  },
})

module.exports = axiosInstance
