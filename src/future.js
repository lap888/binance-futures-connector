const APIBase = require('./APIBase')
const { AccountTrades, WebSocket, MarketData } = require('./modules')
const { flowRight } = require('./helpers/utils')

class Future extends flowRight(AccountTrades, MarketData, WebSocket)(APIBase) {

    constructor(apiKey = '', apiSecret = '', options = {}) {
        options.baseURL = options.baseURL || 'https://fapi.binance.com'
        super({
            apiKey,
            apiSecret,
            ...options
        })
    }
}

module.exports = Future
