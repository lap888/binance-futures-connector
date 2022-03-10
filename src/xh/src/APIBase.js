const crypto = require('crypto')
const { removeEmptyValue, buildQueryString, createRequest, defaultLogger } = require('./helpers/utils')

class APIBase {
  constructor(options) {
    const { apiKey, apiSecret, baseURL, logger, ip, port } = options

    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.baseURL = baseURL
    this.ip = ip
    this.port = port
    this.logger = logger || defaultLogger
  }

  publicRequest(method, path, params = {}) {
    params = removeEmptyValue(params)
    params = buildQueryString(params)
    if (params !== '') {
      path = `${path}?${params}`
    }
    return createRequest({
      method: method,
      baseURL: this.baseURL,
      url: path,
      apiKey: this.apiKey,
      ip: this.ip,
      port: this.port
    })
  }

  signRequest(method, path, params = {}) {
    params = removeEmptyValue(params)
    const timestamp = Date.now()
    const queryString = buildQueryString({ ...params, timestamp })
    const signature = crypto
      .createHmac('sha256', this.apiSecret)
      .update(queryString)
      .digest('hex')

    return createRequest({
      method: method,
      baseURL: this.baseURL,
      url: `${path}?${queryString}&signature=${signature}`,
      apiKey: this.apiKey,
      ip: this.ip,
      port: this.port
    })
  }
}

module.exports = APIBase
