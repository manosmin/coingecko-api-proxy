const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

const axiosError = (error, contextMessage = 'Axios error') => {
  if (process.env.NODE_ENV !== 'test') {
    if (error.response) {
      console.error(`${contextMessage}: Response status ${error.response.status}`, {
        data: error.response.data,
        headers: error.response.headers,
        config: error.config,
      })
    } else if (error.request) {
      console.error(`${contextMessage}: No response received`, {
        request: error.request,
        config: error.config,
      })
    } else {
      console.error(`${contextMessage}: Request setup failed`, { message: error.message })
    }
  }
}

module.exports = { info, error, axiosError }
