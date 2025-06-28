const express = require('express')
const logger = require('../utils/logger')
const proxy = require('../services/proxy')

const coinsRouter = express.Router()

coinsRouter.get('/markets', async (req, res) => {
  let { page = 1, per_page = 10 } = req.query

  page = parseInt(page, 10)
  per_page = parseInt(per_page, 10)

  if ( isNaN(page) || page < 1 || isNaN(per_page) || per_page < 1 || per_page > 250) {
    logger.info(`Invalid query parameters: page=${req.query.page}, per_page=${req.query.per_page}`)
    return res.status(400).json({ error: 'Invalid query parameters. `page` must be a positive integer and `per_page` must be between 1 and 250.' })
  }

  try {
    const data = await proxy.fetchCoinMarketData(page, per_page)

    if (!data) {
      logger.info('No data received from CoinGecko API')
      return res.status(404).json({ error: 'No market data available.' })
    }

    logger.info('Market data fetched successfully')
    res.status(200).json(data)
  } catch (error) {
    logger.axiosError('Error fetching data: ', error)
    res.status(500).json({ error: 'Failed to fetch market data.' })
  }
})

coinsRouter.get('/:id', async (req, res) => {
  const coinId = req.params.id

  try {
    const data = await proxy.fetchCoinById(coinId)

    if (!data) {
      logger.info(`No data found for ${coinId}`)
      return res.status(404).json({ error: 'Coin not found.' })
    }

    logger.info(`Data for ${coinId} fetched successfully`)
    res.status(200).json(data)
  } catch (error) {
    logger.axiosError(`Error fetching data for ${coinId}: `, error)
    res.status(500).json({ error: 'Failed to fetch coin data.' })
  }
})

module.exports = coinsRouter
