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


// client.newOrder('NUUSDT', 'BUY', 'LONG', 'MARKET', { quantity: 10 }).then(res => {
//     console.log('买入', res.data)
// }).catch(err=>{
//     console.log(err)
// })

// client.account().then(account => {
//     account.data.positions.map(v => {
//         if ((v.symbol == "NUUSDT" || v.symbol == "SUSHIUSDT") && v.positionSide == "LONG") {
//             console.log(v)
//         }
//     })
//     console.log(account.data.totalWalletBalance)
// })
//

// client.leverageBracket().then(res => {
//     res.data.map(v => {
//         if ((v.symbol == "NUUSDT" || v.symbol == "SUSHIUSDT")) {
//             console.log(v.brackets[0])
//         }
//     })
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
//     console.log(symbolArr[0])
//     console.log(symbolArr[symbolArr.length - 1])
// })

// updateLeverage('NUUSDT', 15);


// client.account().then(account => {
//     let pos = [];
//     account.data.positions.forEach((item1) => {
//         if (Number(item1.positionAmt) != 0) {
//             pos.push(item1);
//         }
//     });
//     console.log(pos)
// })