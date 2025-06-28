const logger = require('../utils/logger')
const axiosInstance = require('../utils/axios')

const COINGECKO_MARKETS_URL = 'https://api.coingecko.com/api/v3/coins/markets'
const COINGECKO_COINS_URL = 'https://api.coingecko.com/api/v3/coins'

const fetchCoinMarketData = async (page, perPage) => {
  const url = `${COINGECKO_MARKETS_URL}?vs_currency=usd&order=market_cap_desc&page=${page}&per_page=${perPage}`

  logger.info('Fetching data from CoinGecko API: ', url)

  const response = await axiosInstance.get(url)

  if (response.data) {
    return response.data.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    }))
  }

  return null
}

const fetchCoinById = async (coinId) => {
  const url = `${COINGECKO_COINS_URL}/${coinId}`

  logger.info('Fetching data from CoinGecko API: ', url)

  const response = await axiosInstance.get(url)

  if (response.data) {
    const coin = response.data
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      description: coin.description?.en,
      current_price: coin.market_data.current_price?.usd,
      high_24h: coin.market_data.high_24h.usd,
      low_24h: coin.market_data.low_24h.usd,
      price_changes: {
        pc_24h: coin.market_data.price_change_percentage_24h,
        pc_7d: coin.market_data.price_change_percentage_7d,
        pc_14d: coin.market_data.price_change_percentage_14d,
        pc_30d: coin.market_data.price_change_percentage_30d,
        pc_60d: coin.market_data.price_change_percentage_60d,
        pc_200d: coin.market_data.price_change_percentage_200d,
        pc_1y: coin.market_data.price_change_percentage_1y,
      }
    }
  }

  return null
}

module.exports = { fetchCoinMarketData, fetchCoinById }