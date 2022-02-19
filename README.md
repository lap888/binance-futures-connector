# binance-futures-connector in nodejs

[![npm version](https://badge.fury.io/js/%40binance%2Fconnector.svg)](https://badge.fury.io/js/%40binance%2Fconnector)
[![Node version](https://img.shields.io/node/v/%40binance%2Fconnector.svg?style=flat)](http://nodejs.org/download/)
[![Standard-Js](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


This is a lightweight library that works as a connector to [Binance public API](https://github.com/binance/binance-spot-api-docs). It’s designed to be simple, clean, and easy to use with minimal dependencies.

- Supported APIs:
    - `/fapi/*`
- Inclusion of test cases and examples
- Customizable base URL, request timeout and HTTP   
- Response metadata can be displayed
- Customizable Logger

- 新增常用指标


## Installation

```bash
npm install binance-futures-connector
```

## Documentation

[https://binance-docs.github.io/apidocs/futures/cn/#185368440e](https://binance-docs.github.io/apidocs/futures/cn/#185368440e)

## RESTful APIs

```javascript
const { Future } = require('binance-futures-connector')

const apiKey = ''
const apiSecret = ''
const client = new Future(apiKey, apiSecret)

// Get account information
client.account().then(response => client.logger.log(response.data))

// Place a new order
client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
  price: '350',
  quantity: 1,
  timeInForce: 'GTC'
}).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))

```


### Base URL

If `base_url` is not provided, it defaults to `fapi.binance.com`.

It's recommended to pass in the `base_url` parameter, even in production as Binance provides alternative URLs in case of performance issues:

- `https://fapi.binance.com`

### Optional Parameters

Optional parameters are encapsulated to a single object as the last function parameter.

```javascript
const { Future } = require('binance-futures-connector')

const apiKey = ''
const apiSecret = ''
const client = new Future(apiKey, apiSecret)

client.account({ recvWindow: 2000 }).then(response => client.logger.log(response.data))

```

### Response Metadata

The Binance API server provides weight usages in the headers of each response. This information can be fetched from `headers` property. `x-mbx-used-weight` and `x-mbx-used-weight-1m` show the total weight consumed within 1 minute.

```
// client initialization is skipped

client.exchangeInfo().then(response => client.logger.log(response.headers['x-mbx-used-weight-1m']))

```

### Custom Logger Integration

```javascript
const Spot = require('@binance/connector')
const fs = require('fs')
const { Console } = require('console')

// make sure the logs/ folder is created beforehand
const output = fs.createWriteStream('./logs/stdout.log')
const errorOutput = fs.createWriteStream('./logs/stderr.log')

const logger = new Console({ stdout: output, stderr: errorOutput })
const client = new Spot('', '', {logger: logger})

client.exchangeInfo().then(response => client.logger.log(response.data))
// check the output file

```

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

### Error

There are 2 types of error that may be returned from the API server and the user has to handle it properly:

- `Client error`
  - This is thrown when server returns `4XX`, it's an issue from client side.
  - The following properties may be helpful to resolve the issue:
    - Response header - Please refer to `Response Metadata` section for more details.
    - HTTP status code
    - Error code - Server's error code, e.g. `-1102`
    - Error message - Server's error message, e.g. `Unknown order sent.`
    - Request config - Configuration send to the server, which can include URL, request method and headers.
 
  ```
  // client initialization is skipped
  client.exchangeInfo({ symbol: 'invalidSymbol' })
    .then(response => client.logger.log(response.data))
    .catch(err => {
      client.logger.error(err.response.headers) // full response header
      client.logger.error(err.response.status) // HTTP status code 400
      client.logger.error(err.response.data) // includes both error code and message
      client.logger.error(err.response.config) // includes request's config 
    })

  ```
        
- `Server error`
  - This is thrown when server returns `5XX`, it's an issue from server side.


## Websocket

```javascript
const { Spot } = require('@binance/connector')

const client = new Spot('', '', {
  wsURL: 'wss://testnet.binance.vision' // If optional base URL is not provided, wsURL defaults to wss://stream.binance.com:9443
})

const callbacks = {
  open: () => client.logger.log('open'),
  close: () => client.logger.log('closed'),
  message: data => client.logger.log(data)
}
const aggTrade = client.aggTradeWS('bnbusdt', callbacks)

// unsubscribe the stream above
setTimeout(() => client.unsubscribe(aggTrade), 3000)

// support combined stream
const combinedStreams = client.combinedStreams(['btcusdt@miniTicker', 'ethusdt@tikcer'], callbacks)
```


More websocket examples are available in the `examples` folder

### Unsubscribe a Stream

Unsubscription is achieved by closing the connection. If this method is called without any connection established, the console will output a message `No connection to close.`

```
// client initialization is skipped
const wsRef = client.aggTradeWS('bnbusdt', callbacks)

// The connection (bnbusdt@aggTrade) is closed after 3 secs.
setTimeout(() => client.unsubscribe(wsRef), 3000)

```

### Auto Reconnect

If there is a close event not initiated by the user, the reconnection mechanism will be triggered in 5 secs.

### Custom Logger Integration

```javascript
const { Console } = require('console')
const fs = require('fs')
const Spot = require('@binance/connector')

const output = fs.createWriteStream('./logs/stdout.log')
const errorOutput = fs.createWriteStream('./logs/stderr.log')

// make sure the logs/ folder is created beforehand
const logger = new Console({ stdout: output, stderr: errorOutput })
const client = new Spot('', '', {logger})

const callbacks = {
  open: () => client.logger.log('open'),
  close: () => client.logger.log('closed'),
  message: data => client.logger.log(data)
}

const wsRef = client.aggTradeWS('bnbusdt', callbacks)
setTimeout(() => client.unsubscribe(wsRef), 5000)
// check the output file

```

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

Note that when the connection is initialized, the console outputs a list of callbacks in the form of `listen to event: <event_name>`.

## Test

```bash
npm install

npm run test

```
## 常用指标调用eg

``` BOLL
const { Future,TA } = require('binance-futures-connector')
const apiKey = ''
const apiSecret = ''
const proxyIp = '127.0.0.1'
const proxy = '1087'
const fs = require('fs')
const client = new Future(apiKey, apiSecret, { ip: proxyIp, port: proxy })

client.records("ETHUSDT", "5m").then(records => {
    if (records && records.length > 20) {
        console.log("ETHUSDT", "5m", "time now:", TA.getDate())
        let boll = TA.BOLL(records, 90, 2)
        let upLine = boll[0]
        let midLine = boll[1]
        let downLine = boll[2]
        console.log("upLine", upLine[upLine.length - 1])
        console.log("midLine", midLine[midLine.length - 1])
        console.log("downLine", downLine[downLine.length - 1])
        let macd = TA.MACD(records, 12, 26, 9)
        let dif = macd[0]
        let dea = macd[1]
        let _macd = macd[2]
        console.log("DIF:", dif[dif.length - 1], "DEA:", dea[dea.length - 1], "MACD:", _macd[_macd.length - 1])
        var kdj = TA.KDJ(records, 9, 3, 3)
        let k = kdj[0]
        let d = kdj[1]
        let j = kdj[2]
        console.log("k:", k[k.length - 1], "d:", d[d.length - 1], "MACD:", j[j.length - 1])
        var rsi = TA.RSI(records, 14)
        console.log("rsi:", rsi[rsi.length - 1])
        var atr = TA.ATR(records, 14)
        console.log("atr:", atr[atr.length - 1])
        var obv = TA.OBV(records)
        console.log("obv", obv[obv.length - 1])
        var ema = TA.EMA(records, 9)
        console.log("ema-9", ema[ema.length - 1])
        var ma = TA.MA(records, 14)
        console.log("ma-14", ma[ma.length - 1])
        let h = TA.Highest(records, 30, 'High')
        let l = TA.Lowest(records, 30, 'Low')
        console.log(`h=${h},l=${l}`)
    }
}).catch(res => {
    console.log(res)
})

```