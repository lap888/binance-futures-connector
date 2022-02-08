const { validateRequiredParameters } = require('../helpers/validation.js')
const { isEmptyValue } = require('../helpers/utils')
const WebSocketClient = require('ws')
let url = require('url');
let HttpsProxyAgent = require('https-proxy-agent');


/**
 * Websocket 行情推送
 * @module Websocket
 * @param {*} superclass
 */
const Websocket = superclass => class extends superclass {
  constructor(options) {
    super(options)
    this.wsURL = options.wsURL || 'wss://fstream.binance.com'
    this.reconnectDelay = 5000
    this.ip = options.ip;
    this.port = options.port;
  }

  /**
   * Listen to User data stream<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#user-data-streams}
   *
   * @param {string} listenKey
   */
  userData(listenKey, callbacks) {
    validateRequiredParameters({ listenKey })
    const url = `${this.wsURL}/ws/${listenKey}`
    return this.subscribe(url, callbacks)
  }

  /**
   * Listen to market streams<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams}
   *
   * @param {array} streams
   *
   * e.g. client.combinedStreams(['btcusdt@miniTicker', 'ethusdt@ticker'], callbacks)
   */
  combinedStreams(streams, callbacks) {
    if (!Array.isArray(streams)) {
      streams = [streams]
    }
    const url = `${this.wsURL}/stream?streams=${streams.join('/')}`
    return this.subscribe(url, callbacks)
  }


  subscribe(urls, callbacks) {
    let options = {}
    if (this.ip != '' && this.ip != undefined && this.port != '' && this.port != undefined) {
      let proxy = `http://${this.ip}:${this.port}`;
      let agent = new HttpsProxyAgent(url.parse(proxy));
      options.agent = agent;
    }
    const wsRef = {}
    wsRef.closeInitiated = false
    const initConnect = () => {
      const ws = new WebSocketClient(urls, options)
      wsRef.ws = ws
      Object.keys(callbacks).forEach((event, _) => {
        console.log(`监听事件: ${event}`)
        ws.on(event, callbacks[event])
      })

      ws.on('ping', () => {
        console.log('接收到来自服务端的ping')
        ws.pong()
      })

      ws.on('pong', () => {
        console.log('接收到来自服务端的pong')
      })

      ws.on('error', err => {
        console.log(`err=${err}`)
      })

      ws.on('close', (closeEventCode, reason) => {
        if (!wsRef.closeInitiated) {
          console.log(`ws连接关闭,原因:${closeEventCode}: ${reason}`)
          setTimeout(() => {
            console.log('ws重新链接...')
            initConnect()
          }, this.reconnectDelay)
        } else {
          wsRef.closeInitiated = false
        }
      })
    }
    console.log(`${urls}`)
    initConnect()
    return wsRef
  }

  /**
   * Unsubscribe the stream <br>
   *
   * @param {WebSocketClient} wsRef - websocket client instance created by ws package
   */
  unsubscribe(wsRef) {
    if (!wsRef || !wsRef.ws) console.log('No connection to close.')
    else {
      wsRef.closeInitiated = true
      wsRef.ws.close()
    }
  }
}

module.exports = Websocket
