const { validateRequiredParameters } = require('../helpers/validation.js')
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
     * POST /fapi/v1/order (HMAC SHA256)<br>
     * {@link https://binance-docs.github.io/apidocs/futures/cn/#user_data-2}
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
    /**
     * 杠杆分层标准 (USER_DATA)
     * @param {*} options {symbol	STRING	NO	recvWindow	LONG	NO	timestamp	LONG	YES}
     * @returns 
     */
    leverageBracket(options = {}) {
        return this.signRequest(
            'GET',
            '/fapi/v1/leverageBracket',
            options
        )
    }

    /**
     * 获取账户损益资金流水(USER_DATA)
     * @param {*} options symbol	STRING	NO	交易对
            incomeType	STRING	NO	收益类型 "TRANSFER"划转，"WELCOME_BONUS"体验金，"REALIZED_PNL"已实现盈亏，"FUNDING_FEE"资金费用，"COMMISSION"手续费，"INSURANCE_CLEAR"爆仓清算，"REFERRAL_KICKBACK"推荐人返佣, "COMMISSION_REBATE"被推荐人返现，"DELIVERED_SETTELMENT"下架结算, "COIN_SWAP_DEPOSIT"资产转换转入, "COIN_SWAP_WITHDRAW" 资产转换转出
            startTime	LONG	NO	起始时间
            endTime	LONG	NO	结束时间
            limit	INT	NO	返回的结果集数量 默认值:100 最大值:1000
            recvWindow	LONG	NO	timestamp	LONG	YES
     * @returns 
     */
    income(options = {}) {
        return this.signRequest(
            'GET',
            '/fapi/v1/income',
            options
        )
    }
}

module.exports = AccountTrades