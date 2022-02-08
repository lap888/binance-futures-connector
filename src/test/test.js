const { Future } = require('../index')

const apiKey = ''
const apiSecret = ''
const proxyIp = '127.0.0.1'
const proxy = '1087'
const { Console } = require('console')
const fs = require('fs')
const output = fs.createWriteStream('./logs/out.log')
const errorOutput = fs.createWriteStream('./logs/err.log')
const logger = new Console({
    stdout: output,
    stderr: errorOutput
})

const client = new Future(apiKey, apiSecret, { ip: proxyIp, port: proxy, logger })

// client.premiumIndex({ symbol: 'RAYUSDT' }).then(response => {
//     client.logger.log(response.data)
// })

// client.premiumIndex().then(response => {
//     let symbolArr = response.data;
//     let compare = function (prop) {
//         return function (obj1, obj2) {
//             var val1 = obj1[prop];
//             var val2 = obj2[prop];
//             if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
//                 val1 = Number(val1);
//                 val2 = Number(val2);
//             }
//             if (val1 < val2) {
//                 return 1;
//             } else if (val1 > val2) {
//                 return -1;
//             } else {
//                 return 0;
//             }
//         }
//     }
//     symbolArr.sort(compare("lastFundingRate"))
//     client.logger.log(symbolArr[0])
//     client.logger.log(symbolArr[symbolArr.length - 1])
// })

// client.fundingRate().then(res => {
//     client.logger.log(res.data)
// })

// // Get account information
// client.account().then(response => {
//     client.logger.log(response.data)
// })

// //
// client.exchangeInfo().then(response => {
//     client.logger.log(response.headers['x-mbx-used-weight-1m'])
// })

// Place a new order
// client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
//   price: '350',
//   quantity: 1,
//   timeInForce: 'GTC'
// }).then(response => client.logger.log(response.data))
//   .catch(error => client.logger.error(error))