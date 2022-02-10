const { validateRequiredParameters } = require('../helpers/validation.js')
/**
 * 行情接口
 * @module MarketData
 * @param {*} superclass
 */
const MarketData = superclass => class extends superclass {

    /**
     * 最新标记价格和资金费率<br>
     *
     * GET /fapi/v1/premiumIndex<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#69f9b0b2f3}
     *
     */
    premiumIndex(options = {}) {
        return this.signRequest(
            'GET',
            '/fapi/v1/premiumIndex',
            options
        )
    }

    /**
     * 查询资金费率历史   
     * @param {?} options {symbol:交易对,startTime:起始时间,endTime:结束时间,limit:默认值:100 最大值:1000}
     * @returns 
     */
    fundingRate(options = {}) {
        return this.signRequest(
            'GET',
            '/fapi/v1/fundingRate',
            options
        )
    }
}

module.exports = MarketData