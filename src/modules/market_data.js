const { validateRequiredParameters } = require('../helpers/validation.js')
/**
 * 行情接口
 * @module MarketData
 * @param {*} superclass
 */
const MarketData = superclass => class extends superclass {

    /**
     * 测试服务器连通性 PING
     * @param {*} options 
     * @returns 
     */
    ping(options = {}) {
        return this.publicRequest(
            'GET',
            '/fapi/v1/ping',
            options
        )
    }

    /**
     * 获取服务器时间
     * @param {*} options 
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#3f1907847c} 
     */
    time(options = {}) {
        return this.publicRequest(
            'GET',
            '/fapi/v1/time',
            options
        )
    }

    /**
     * 获取交易规则和交易对 NONE
     * @param {*} options 
     * 
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#3f1907847c} 
     */
    exchangeInfo(options = {}) {
        return this.publicRequest(
            'GET',
            '/fapi/v1/exchangeInfo',
            options
        )
    }

    /**
     * 获取交易对深度
     * @param {*} symbol 
     * @param {*} options 
     * @returns 
     */
    depth(symbol, options = {}) {
        validateRequiredParameters({ symbol })
        return this.signRequest(
            'GET',
            '/fapi/v1/depth',
            Object.assign(options, {
                symbol: symbol
            })
        )
    }
    /**
     * 获取近期订单簿成交
     * @param {*} options 
     * 
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#38a975b802} 
     */
    trades(symbol, options = {}) {
        validateRequiredParameters({ symbol })
        return this.publicRequest(
            'GET',
            '/fapi/v1/trades',
            Object.assign(options, {
                symbol: symbol
            })
        )
    }

    /**
     * 获取交易对价格
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#8ff46b58de} 
     * @param {*} symbol 
     * @param {*} options 
     * @returns 
     */
    price(options = {}) {
        return this.publicRequest(
            'GET',
            '/fapi/v1/ticker/price',
            options
        )
    }

    /**
     * 24hr价格变动情况
     * @param {*} options 
     * @returns 
     */
    price24hr(options = {}) {
        return this.publicRequest(
            'GET',
            '/fapi/v1/ticker/24hr',
            options
        )
    }
    /**
     * K线数据 symbol	STRING	YES	交易对
            interval	ENUM	YES	时间间隔
            startTime	LONG	NO	起始时间
            endTime	LONG	NO	结束时间
            limit	INT	NO	默认值:500 最大值:1500.
     * @param {*} symbol 
     * @param {*} interval 
     * @param {*} options 
     * @returns 
     */
    klines(symbol, interval, options = {}) {
        validateRequiredParameters({ symbol, interval })
        return this.publicRequest(
            'GET',
            '/fapi/v1/klines',
            Object.assign(options, {
                symbol: symbol,
                interval: interval
            })
        )
    }

    /**
     * 标记价格K线数据 symbol	STRING	YES	交易对
                    interval	ENUM	YES	时间间隔
                    startTime	LONG	NO	起始时间
                    endTime	LONG	NO	结束时间
                    limit	INT	NO	默认值:500 最大值:1500.
     * @param {*} symbol 
     * @param {*} interval 
     * @param {*} options 
     * @returns 
     */
    markPriceKlines(symbol, interval, options = {}) {
        validateRequiredParameters({ symbol, interval })
        return this.publicRequest(
            'GET',
            '/fapi/v1/markPriceKlines',
            Object.assign(options, {
                symbol: symbol,
                interval: interval
            })
        )
    }

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

    /**
     * 获取未平仓合约数 symbol	STRING	YES	交易对
     * @param {*} options 
     * @returns 
     */
    openInterest(options = {}) {
        return this.signRequest(
            'GET',
            '/fapi/v1/openInterest',
            options
        )
    }

    /**
     * 合约持仓量 symbol	STRING	YES	
                period	ENUM	YES	"5m","15m","30m","1h","2h","4h","6h","12h","1d"
                limit	LONG	NO	default 30, max 500
                startTime	LONG	NO	
                endTime	LONG	NO
     * @param {*} symbol 
     * @param {*} period 
     * @param {*} options 
     * @returns 
     */
    openInterestHist(symbol, period, options = {}) {
        validateRequiredParameters({ symbol, period })
        return this.publicRequest(
            'GET',
            '/futures/data/openInterestHist',
            Object.assign(options, {
                symbol: symbol,
                period: period
            })
        )
    }

    /**
     * 大户账户数多空比 symbol	STRING	YES	
                period	ENUM	YES	"5m","15m","30m","1h","2h","4h","6h","12h","1d"
                limit	LONG	NO	default 30, max 500
                startTime	LONG	NO	
                endTime	LONG	NO
     * @param {*} symbol 
     * @param {*} period 
     * @param {*} options 
     * @returns 
     */
    topLongShortAccountRatio(symbol, period, options = {}) {
        validateRequiredParameters({ symbol, period })
        return this.publicRequest(
            'GET',
            '/futures/data/topLongShortAccountRatio',
            Object.assign(options, {
                symbol: symbol,
                period: period
            })
        )
    }

    /**
     * 大户持仓量多空比 symbol	STRING	YES	
                period	ENUM	YES	"5m","15m","30m","1h","2h","4h","6h","12h","1d"
                limit	LONG	NO	default 30, max 500
                startTime	LONG	NO	
                endTime	LONG	NO
     * @param {*} symbol 
     * @param {*} period 
     * @param {*} options 
     * @returns 
     */
    topLongShortPositionRatio(symbol, period, options = {}) {
        validateRequiredParameters({ symbol, period })
        return this.publicRequest(
            'GET',
            '/futures/data/topLongShortPositionRatio',
            Object.assign(options, {
                symbol: symbol,
                period: period
            })
        )
    }

    /**
     * 大户持仓量多空比 symbol	STRING	YES	
                period	ENUM	YES	"5m","15m","30m","1h","2h","4h","6h","12h","1d"
                limit	LONG	NO	default 30, max 500
                startTime	LONG	NO	
                endTime	LONG	NO
     * @param {*} symbol 
     * @param {*} period 
     * @param {*} options 
     * @returns 
     */
    globalLongShortAccountRatio(symbol, period, options = {}) {
        validateRequiredParameters({ symbol, period })
        return this.publicRequest(
            'GET',
            '/futures/data/globalLongShortAccountRatio',
            Object.assign(options, {
                symbol: symbol,
                period: period
            })
        )
    }

    /**
     * 合约主动买卖量 symbol	STRING	YES	
                period	ENUM	YES	"5m","15m","30m","1h","2h","4h","6h","12h","1d"
                limit	LONG	NO	default 30, max 500
                startTime	LONG	NO	
                endTime	LONG	NO
     * @param {*} symbol 
     * @param {*} period 
     * @param {*} options 
     * @returns 
     */
    takerlongshortRatio(symbol, period, options = {}) {
        validateRequiredParameters({ symbol, period })
        return this.publicRequest(
            'GET',
            '/futures/data/takerlongshortRatio',
            Object.assign(options, {
                symbol: symbol,
                period: period
            })
        )
    }
}

module.exports = MarketData