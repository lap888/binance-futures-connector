/**
 * 行情接口
 * @module AccountTrades
 * @param {*} superclass
 */
const AccountTrades = superclass => class extends superclass {

    /**
   * 生成listenKey (USER_STREAM)<br>
   *
   * POST /fapi/v1/listenKey<br>
   *
   * {@link https://binance-docs.github.io/apidocs/futures/cn/#listenkey-user_stream}
   *
   */
    listenKeyPost(options = {}) {
        return this.signRequest(
            'POST',
            '/fapi/v1/listenKey',
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
     * 获取交易对价格
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#8ff46b58de} 
     * @param {*} symbol 
     * @param {*} options 
     * @returns 
     */
    price(options = {}) {
        // symbol = symbol + "USDT";
        return this.publicRequest(
            'GET',
            '/fapi/v1/ticker/price',
            options
        )
    }



    /**
     * 延长listenKey有效期 (USER_STREAM)<br>
     *
     * PUT /fapi/v1/listenKey<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#listenkey-user_stream-2}
     *
     */

    listenKeyPut() {
        return this.signRequest(
            'PUT',
            '/fapi/v1/listenKey'
        )
    }

    /**
     * 关闭listenKey (USER_STREAM)<br>
     *
     * DELETE /fapi/v1/listenKey<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#listenkey-user_stream-3}
     *
     */

    listenKeyDelete() {
        return this.signRequest(
            'DELETE',
            '/fapi/v1/listenKey'
        )
    }
    /**
   * 更改持仓模式(TRADE)
   * @param {*} dualSidePosition true 双向持仓
   * @param {*} options 
   * {@link https://binance-docs.github.io/apidocs/futures/cn/#87a7130ac5} 
   */
    updatePositionSide(dualSidePosition, options = {}) {
        validateRequiredParameters({ dualSidePosition })
        return this.signRequest(
            'POST',
            '/fapi/v1/positionSide/dual',
            Object.assign(options, {
                dualSidePosition: dualSidePosition
            })
        )
    }

    /**
     * 查询持仓模式(USER_DATA)
     * @param {*} options 
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#87a7130ac5} 
     */
    getPositionSide(options = {}) {
        return this.signRequest(
            'GET',
            '/fapi/v1/positionSide/dual',
            options
        )
    }
    /**
     * 获取交易对深度
     * @param {*} symbol 
     * @param {*} options 
     * @returns 
     */
    getDepth(symbol, options = {}) {
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
     * 账户信息V2 (USER_DATA)
     * @param {*} options 
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#v2-user_data} 
     */
    account(options = {}) {
        return this.signRequest(
            'GET',
            '/fapi/v2/account',
            options
        )
    }

    /**
     * 下单 (TRADE)<br>
     *
     * POST /fapi/v1/order (HMAC SHA256)<br>
     *
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#user_data-2}
     *
     * @param {string} symbol
     * @param {string} side 买卖方向 SELL, BUY
     * @param {string} positionSide 持仓方向，单向持仓模式下非必填，默认且仅可填BOTH;在双向持仓模式下必填,且仅可选择 LONG 或 SHORT
     * @param {string} type 订单类型 LIMIT, MARKET, STOP, TAKE_PROFIT, STOP_MARKET, TAKE_PROFIT_MARKET, TRAILING_STOP_MARKET
     * @param {object} [options]
     * @param {string} [options.timeInForce]
     * @param {number} [options.quantity]
     * @param {number} [options.price]
     * @param {string} [options.newClientOrderId] 用户自定义的订单号，不可以重复出现在挂单中。如空缺系统会自动赋值。必须满足正则规则 ^[\.A-Z\:/a-z0-9_-]{1,36}$
     * @param {number} [options.stopPrice]
     * @param {number} [options.icebergQty]
     * @param {string} [options.newOrderRespType]
     * @param {number} [options.recvWindow] - The value cannot be greater than 60000
     */
    newOrder(symbol, side, positionSide, type, options = {}) {
        validateRequiredParameters({ symbol, positionSide, side, type })
        return this.signRequest(
            'POST',
            '/fapi/v1/order',
            Object.assign(options, {
                symbol: symbol.toUpperCase(),
                side: side.toUpperCase(),
                positionSide: positionSide.toLocaleUpperCase(),
                type: type.toUpperCase()
            })
        )
    }
    /**
     * 调整开仓杠杆 (TRADE)
     * 调整用户在指定symbol合约的开仓杠杆
     * POST /fapi/v1/leverage (HMAC SHA256)
     * @param {*} symbol 
     * @param {*} leverage 目标杠杆倍数：1 到 125 整数
     * @param {*} options 
     * @returns 
     */
    leverage(symbol, leverage, options = {}) {
        validateRequiredParameters({ symbol, leverage })
        return this.signRequest(
            'POST',
            '/fapi/v1/leverage',
            Object.assign(options, {
                symbol: symbol.toUpperCase(),
                leverage: leverage
            })
        )
    }
}

module.exports = AccountTrades