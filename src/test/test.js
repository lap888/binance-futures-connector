const { Future,TA } = require('../index')

const apiKey = ''
const apiSecret = ''
const proxyIp = '127.0.0.1'
const proxy = '1087'
// const { Console } = require('console')
const fs = require('fs')
// const output = fs.createWriteStream('./logs/out.log')
// const errorOutput = fs.createWriteStream('./logs/err.log')
// const logger = new Console({
//     stdout: output,
//     stderr: errorOutput
// })

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

// client.premiumIndex({ symbol: 'RAYUSDT' }).then(response => {
//     console.log(response.data)
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

// client.fundingRate().then(res => {
//     console.log(res.data)
// })

// // Get account information
// client.account().then(response => {
//     console.log(response.data)
// })

// //
// client.exchangeInfo().then(response => {
//     console.log(response.headers['x-mbx-used-weight-1m'])
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