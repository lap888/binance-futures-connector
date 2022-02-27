const Std = {
    _skip: function (arr, period) {
        let j = 0;
        for (let k = 0; j < arr.length; j++) {
            if (!isNaN(arr[j]))
                k++;
            if (k == period)
                break;
        }
        return j;
    },
    _sum: function (arr, num) {
        let sum = 0.0;
        for (let i = 0; i < num; i++) {
            if (!isNaN(arr[i])) {
                sum += arr[i];
            }
        }
        return sum;
    },
    _sumArry: function (a, b) {
        let d = [];
        for (let i = 0; i < b.length; i++) {
            if (isNaN(a[i]) || isNaN(b[i])) {
                d.push(NaN);
            } else {
                d.push(a[i] + b[i]);
            }
        }
        return d;
    },
    _adx: function (a, b, c) {
        let d = [];
        let l = Math.min(a.length, b.length, c.length)
        for (let i = 0; i < l; i++) {
            if (isNaN(a[i]) || isNaN(b[i])) {
                d.push(NaN);
            } else {
                let sum = 1;
                if (c[i] != 0) {
                    sum = c[i]
                }
                let _d = (Math.abs(a[i] - b[i]) / sum) * 100;
                d.push(_d);
            }
        }
        return d;
    },
    _avg: function (arr, num) {
        let n = 0;
        let sum = 0.0;
        for (let i = 0; i < num; i++) {
            if (!isNaN(arr[i])) {
                sum += arr[i];
                n++;
            }
        }
        return sum / n;
    },

    _zeros: function (len) {
        let n = [];
        for (let i = 0; i < len; i++) {
            n.push(0.0);
        }
        return n;
    },

    _set: function (arr, start, end, value) {
        let e = Math.min(arr.length, end);
        for (let i = start; i < e; i++) {
            arr[i] = value;
        }
    },

    _diff: function (a, b) {
        let d = [];
        for (let i = 0; i < b.length; i++) {
            if (isNaN(a[i]) || isNaN(b[i])) {
                d.push(NaN);
            } else {
                d.push(a[i] - b[i]);
            }
        }
        return d;
    },
    _diffSub: function (a, b) {
        let d = [];
        let length = Math.min(a.length, b.length)
        for (let i = 0; i < length; i++) {
            if (isNaN(a[i]) || isNaN(b[i])) {
                d.push(NaN);
            } else {
                d.push((a[i] / b[i]) * 100);
            }
        }
        return d;
    },
    _diffDM1: function (a, b) {
        let d = [];
        for (let i = 0; i < b.length; i++) {
            if (isNaN(a[i]) || isNaN(b[i])) {
                d.push(0);
            } else {
                if (a[i] > b[i] && a[i] > 0) {
                    d.push(a[i]);
                } else {
                    d.push(0);
                }
            }
        }
        return d;
    },
    _diffDM2: function (a, b) {
        let d = [];
        for (let i = 0; i < b.length; i++) {
            if (isNaN(a[i]) || isNaN(b[i])) {
                d.push(0);
            } else {
                if (b[i] > a[i] && b[i] > 0) {
                    d.push(b[i]);
                } else {
                    d.push(0);
                }
            }
        }
        return d;
    },
    _move_diff: function (a) {
        let d = [];
        for (let i = 1; i < a.length; i++) {
            d.push(a[i] - a[i - 1]);
        }
        return d;
    },
    _sma: function (S, period) {
        let R = Std._zeros(S.length);
        let j = Std._skip(S, period);
        Std._set(R, 0, j, NaN);
        if (j < S.length) {
            let sum = 0;
            for (let i = j; i < S.length; i++) {
                if (i == j) {
                    sum = Std._sum(S, i + 1);
                } else {
                    sum += S[i] - S[i - period];
                }
                R[i] = sum / period;
            }
        }
        return R;
    },
    _conver: function (s) {
        return s < 10 ? '0' + s : s;
    },
    _smma: function (S, period) {
        let R = Std._zeros(S.length);
        let j = Std._skip(S, period);
        Std._set(R, 0, j, NaN);
        if (j < S.length) {
            R[j] = Std._avg(S, j + 1);
            for (let i = j + 1; i < S.length; i++) {
                R[i] = (R[i - 1] * (period - 1) + S[i]) / period;
            }
        }
        return R;
    },
    _ema: function (S, period) {
        let R = Std._zeros(S.length);
        let multiplier = 2.0 / (period + 1);
        let j = Std._skip(S, period);
        Std._set(R, 0, j, NaN);
        if (j < S.length) {
            R[j] = Std._avg(S, j + 1);
            for (let i = j + 1; i < S.length; i++) {
                R[i] = ((S[i] - R[i - 1]) * multiplier) + R[i - 1];
            }
        }
        return R;
    },
    _rma: function (S, period) {
        let R = Std._zeros(S.length);
        let multiplier = 1 / period;
        let j = Std._skip(S, period);
        Std._set(R, 0, j, NaN);
        if (j < S.length) {
            R[j] = Std._avg(S, j + 1);
            for (let i = j + 1; i < S.length; i++) {
                R[i] = S[i] * multiplier + (1 - multiplier) * R[i - 1];
            }
        }
        return R;
    },
    _cmp: function (arr, start, end, cmpFunc) {
        let v = arr[start];
        for (let i = start; i < end; i++) {
            v = cmpFunc(arr[i], v);
        }
        return v;
    },
    _filt: function (records, n, attr, iv, cmpFunc) {
        if (records.length < 2) {
            return NaN;
        }
        let v = iv;
        let pos = n !== 0 ? records.length - Math.min(records.length - 1, n) - 1 : 0;
        for (let i = records.length - 2; i >= pos; i--) {
            if (typeof (attr) !== 'undefined') {
                v = cmpFunc(v, records[i][attr]);
            } else {
                v = cmpFunc(v, records[i]);
            }
        }
        return v;
    },
    _ticks: function (records) {
        if (records.length === 0) {
            return [];
        }
        let ticks = [];
        if (typeof (records[0].Close) !== 'undefined') {
            for (let i = 0; i < records.length; i++) {
                ticks.push(records[i].Close);
            }
        } else {
            ticks = records;
        }
        return ticks;
    },
    _ticksHigh: function (records) {
        if (records.length === 0) {
            return [];
        }
        let ticks = [];
        if (typeof (records[0].High) !== 'undefined') {
            for (let i = 0; i < records.length; i++) {
                ticks.push(records[i].High);
            }
        } else {
            ticks = records;
        }
        return ticks;
    },
    _ticksLow: function (records) {
        if (records.length === 0) {
            return [];
        }
        let ticks = [];
        if (typeof (records[0].Low) !== 'undefined') {
            for (let i = 0; i < records.length; i++) {
                ticks.push(records[i].Low);
            }
        } else {
            ticks = records;
        }
        return ticks;
    },
};

/**
 * Highest，周期最高价
   TA.Highest(数据, 周期, 属性)，返回最近周期内的最大值(不包含当前Bar)，如TA.Highest(records, 30, 'High')，如果周期为0指所有Bar，如属性不指定则视数据为普通数组，返回一个价格（数值类型）。
 * @param {*} records 
 * @param {*} n 
 * @param {*} attr 
 * @returns 
 */
const Highest = (records, n, attr) => {
    return Std._filt(records, n, attr, Number.MIN_VALUE, Math.max);
}
/**
 * Lowest，周期最低价
   TA.Lowest(数据, 周期, 属性)，返回最近周期内的最小值(不包含当前Bar)，如TA.Lowest(records, 30, 'Low')，如果周期为0指所有Bar，如属性不指定则视数据为普通数组，返回一个价格（数值类型）。
 * @param {*} records 
 * @param {*} n 
 * @param {*} attr 
 * @returns 
 */
const Lowest = (records, n, attr) => {
    return Std._filt(records, n, attr, Number.MAX_VALUE, Math.min);
}
/**
 * MA，移动平均线
   TA.MA(数据, 周期)，MA(数据, 周期)，默认周期参数为9，返回一个一维数组。
 * @param {*} records 
 * @param {*} period 
 * @returns 
 */
const MA = (records, period) => {
    period = typeof (period) === 'undefined' ? 9 : period;
    return Std._sma(Std._ticks(records), period);
}
/**
 * 动向指标 [+DI, -DI,ADX]
 * @param {*} records 
 * @param {*} period 
 * @returns [+DI, -DI,ADX]
 */
const DMI = (records, period) => {
    period = typeof (period) === 'undefined' ? 14 : period;
    let ticksHigh = Std._ticksHigh(records);
    let up = Std._move_diff(ticksHigh);
    let ticksLow = Std._ticksLow(records);
    let down = Std._move_diff(ticksLow);
    let dm1 = Std._diffDM1(up, down)
    let dm2 = Std._diffDM2(up, down)
    let edm1 = Std._rma(dm1, period)
    let edm2 = Std._rma(dm2, period)
    let truerange = ATR(records, period);
    let rtruerange = Std._rma(truerange, period)
    let di1 = Std._diffSub(edm1, rtruerange);
    let di2 = Std._diffSub(edm2, rtruerange)
    let sum = Std._sumArry(di1, di2)
    let adx = Std._adx(di1, di2, sum)
    let eadx = Std._rma(adx, period)
    return [di1, di2, eadx]

}

/**
 * EMA，指数平均数指标
   TA.EMA(数据, 周期)，指数平均数指标。默认周期参数为9，返回一个一维数组。
 * @param {*} records 
 * @param {*} period 
 * @returns 
 */
const EMA = (records, period) => {
    period = typeof (period) === 'undefined' ? 9 : period;
    return Std._ema(Std._ticks(records), period);
}

/**
 * MACD，指数平滑异同平均线
   TA.MACD(数据, 快周期, 慢周期, 信号周期)，默认周期参数为(12, 26, 9)，返回二维数组，分别是[DIF, DEA, MACD]。
 * @param {*} records 
 * @param {*} fastEMA 
 * @param {*} slowEMA 
 * @param {*} signalEMA 
 * @returns 
 */
const MACD = (records, fastEMA, slowEMA, signalEMA) => {
    fastEMA = typeof (fastEMA) === 'undefined' ? 12 : fastEMA;
    slowEMA = typeof (slowEMA) === 'undefined' ? 26 : slowEMA;
    signalEMA = typeof (signalEMA) === 'undefined' ? 9 : signalEMA;
    let ticks = Std._ticks(records);
    let slow = Std._ema(ticks, slowEMA);
    let fast = Std._ema(ticks, fastEMA);
    // DIF
    let dif = Std._diff(fast, slow);
    // DEA
    let signal = Std._ema(dif, signalEMA);
    let histogram = Std._diff(dif, signal);
    return [dif, signal, histogram];
}

/**
 * BOLL，布林带
   TA.BOLL(数据, 周期, 乘数)，BOLL(数据, 周期, 乘数)，布林线指标，默认周期参数为(20, 2)，返回一个二维数组[上线, 中线, 下线]。
 * @param {*} records 
 * @param {*} period 
 * @param {*} multiplier 
 * @returns 
 */
const BOLL = (records, period, multiplier) => {
    period = typeof (period) === 'undefined' ? 20 : period;
    multiplier = typeof (multiplier) === 'undefined' ? 2 : multiplier;
    let S = Std._ticks(records);
    let j = 0;
    for (j = period - 1; j < S.length && isNaN(S[j]); j++);
    let UP = Std._zeros(S.length);
    let MB = Std._zeros(S.length);
    let DN = Std._zeros(S.length);
    Std._set(UP, 0, j, NaN);
    Std._set(MB, 0, j, NaN);
    Std._set(DN, 0, j, NaN);
    let sum = 0;
    for (let i = j; i < S.length; i++) {
        if (i == j) {
            for (let k = 0; k < period; k++) {
                sum += S[k];
            }
        } else {
            sum = sum + S[i] - S[i - period];
        }
        let ma = sum / period;
        let d = 0;
        for (let k = i + 1 - period; k <= i; k++) {
            d += (S[k] - ma) * (S[k] - ma);
        }
        let stdev = Math.sqrt(d / period);
        let up = ma + (multiplier * stdev);
        let dn = ma - (multiplier * stdev);
        UP[i] = up;
        MB[i] = ma;
        DN[i] = dn;
    }
    // upper, middle, lower
    return [UP, MB, DN];
}

/**
 * KDJ，随机指标
   TA.KDJ(数据, 周期1, 周期2, 周期3)，默认周期参数为(9, 3, 3)，返回二维数组，分别是[K, D, J]。
 * @param {*} records 
 * @param {*} n 
 * @param {*} k 
 * @param {*} d 
 * @returns 
 */
const KDJ = (records, n, k, d) => {
    n = typeof (n) === 'undefined' ? 9 : n;
    k = typeof (k) === 'undefined' ? 3 : k;
    d = typeof (d) === 'undefined' ? 3 : d;

    let RSV = Std._zeros(records.length);
    Std._set(RSV, 0, n - 1, NaN);
    let K = Std._zeros(records.length);
    let D = Std._zeros(records.length);
    let J = Std._zeros(records.length);

    let hs = Std._zeros(records.length);
    let ls = Std._zeros(records.length);
    for (let i = 0; i < records.length; i++) {
        hs[i] = records[i].High;
        ls[i] = records[i].Low;
    }

    for (let i = 0; i < records.length; i++) {
        if (i >= (n - 1)) {
            let c = records[i].Close;
            let h = Std._cmp(hs, i - (n - 1), i + 1, Math.max);
            let l = Std._cmp(ls, i - (n - 1), i + 1, Math.min);
            RSV[i] = 100 * ((c - l) / (h - l));
            K[i] = (1 * RSV[i] + (k - 1) * K[i - 1]) / k;
            D[i] = (1 * K[i] + (d - 1) * D[i - 1]) / d;
        } else {
            K[i] = D[i] = 50;
            RSV[i] = 0;
        }
        J[i] = 3 * K[i] - 2 * D[i];
    }
    // remove prefix
    for (let i = 0; i < n - 1; i++) {
        K[i] = D[i] = J[i] = NaN;
    }
    return [K, D, J];
}

/**
 * RSI
   TA.RSI(数据, 周期)RSI(数据, 周期)，默认周期参数为14，返回一个一维数组。
 * @param {*} records 
 * @param {*} period 
 * @returns 
 */
const RSI = (records, period) => {
    period = typeof (period) === 'undefined' ? 14 : period;
    let i;
    let n = period;
    let rsi = Std._zeros(records.length);
    Std._set(rsi, 0, rsi.length, NaN);
    if (records.length < n) {
        return rsi;
    }
    let ticks = Std._ticks(records);
    let deltas = Std._move_diff(ticks);
    let seed = deltas.slice(0, n);
    let up = 0;
    let down = 0;
    for (i = 0; i < seed.length; i++) {
        if (seed[i] >= 0) {
            up += seed[i];
        } else {
            down += seed[i];
        }
    }
    up /= n;
    down = -(down /= n);
    let rs = down != 0 ? up / down : 0;
    rsi[n] = 100 - 100 / (1 + rs);
    let delta = 0;
    let upval = 0;
    let downval = 0;
    for (i = n + 1; i < ticks.length; i++) {
        delta = deltas[i - 1];
        if (delta > 0) {
            upval = delta;
            downval = 0;
        } else {
            upval = 0;
            downval = -delta;
        }
        up = (up * (n - 1) + upval) / n;
        down = (down * (n - 1) + downval) / n;
        rs = up / down;
        rsi[i] = 100 - 100 / (1 + rs);
    }
    return rsi;
}

/**
 * OBV，能量潮
   TA.OBV(数据)，返回一个一维数组。
 * @param {*} records 
 * @returns 
 */
const OBV = (records) => {
    if (records.length === 0) {
        return [];
    }
    if (typeof (records[0].Close) === 'undefined') {
        throw "argument must KLine";
    }
    let R = [];
    for (let i = 0; i < records.length; i++) {
        if (i === 0) {
            R[i] = records[i].Volume;
        } else if (records[i].Close >= records[i - 1].Close) {
            R[i] = R[i - 1] + records[i].Volume;
        } else {
            R[i] = R[i - 1] - records[i].Volume;
        }
    }
    return R;
}
/**
 * RATR
 * @param {*} records 
 * @param {*} cycle 
 * @returns 
 */
const RATR = (records, cycle) => {
    let trList = []
    while (records.length > 1) {
        high = records[records.length - 1].High
        refClose = records[records.length - 2].Close
        low = records[records.length - 1].Low
        trList.unshift(Math.max(Math.max((high - low), Math.abs(refClose - high)), Math.abs(refClose - low)))
        records = records.slice(0, -1)
    }
    return Std._rma(trList, cycle)
}
/**
 * ATR，平均真实波幅
   TA.ATR(数据, 周期)，ATR(数据, 周期)，默认周期参数为14，返回一个一维数组。
 * @param {*} records 
 * @param {*} period 
 * @returns 
 */
const ATR = (records, period) => {
    if (records.length === 0) {
        return [];
    }
    if (typeof (records[0].Close) === 'undefined') {
        throw "argument must KLine";
    }
    period = typeof (period) === 'undefined' ? 14 : period;
    let R = Std._zeros(records.length);
    let sum = 0;
    let n = 0;
    for (let i = 0; i < records.length; i++) {
        let TR = 0;
        if (i == 0) {
            TR = records[i].High - records[i].Low;
        } else {
            TR = Math.max(records[i].High - records[i].Low, Math.abs(records[i].High - records[i - 1].Close), Math.abs(records[i - 1].Close - records[i].Low));
        }
        sum += TR;
        if (i < period) {
            n = sum / (i + 1);
        } else {
            n = (((period - 1) * n) + TR) / period;
        }
        R[i] = n;
    }
    return R;
}

const Alligator = (records, jawLength, teethLength, lipsLength) => {
    jawLength = typeof (jawLength) === 'undefined' ? 13 : jawLength;
    teethLength = typeof (teethLength) === 'undefined' ? 8 : teethLength;
    lipsLength = typeof (lipsLength) === 'undefined' ? 5 : lipsLength;
    let ticks = [];
    for (let i = 0; i < records.length; i++) {
        ticks.push((records[i].High + records[i].Low) / 2);
    }
    return [
        [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN].concat(Std._smma(ticks, jawLength)), // jaw (blue)
        [NaN, NaN, NaN, NaN, NaN].concat(Std._smma(ticks, teethLength)), // teeth (red)
        [NaN, NaN, NaN].concat(Std._smma(ticks, lipsLength)), // lips (green)
    ];
}

const CMF = (records, periods) => {
    periods = periods || 20;
    let ret = [];
    let sumD = 0;
    let sumV = 0;
    let arrD = [];
    let arrV = [];
    for (let i = 0; i < records.length; i++) {
        let d = (records[i].High == records[i].Low) ? 0 : (2 * records[i].Close - records[i].Low - records[i].High) / (records[i].High - records[i].Low) * records[i].Volume;
        arrD.push(d);
        arrV.push(records[i].Volume);
        sumD += d;
        sumV += records[i].Volume;
        if (i >= periods) {
            sumD -= arrD.shift();
            sumV -= arrV.shift();
        }
        ret.push(sumD / sumV);
    }
    return ret;
}

/**
 * timestamp to date
 * @param {*} timetamp 
 * @returns 
 */
const getDate = (timetamp = "") => {
    let myDate = timetamp == "" ? new Date() : new Date(timetamp);  //获取js时间
    let year = myDate.getFullYear(); //获取年
    let month = myDate.getMonth() + 1;//获取月
    let date = myDate.getDate();//获取日
    let h = myDate.getHours(); //获取小时数(0-23)
    let m = myDate.getMinutes(); //获取分钟数(0-59)
    let s = myDate.getSeconds();
    //获取当前时间连接成的字符串
    let now = year + '-' + Std._conver(month) + "-" + Std._conver(date) + " " + Std._conver(h) + ':' + Std._conver(m) + ":" + Std._conver(s);
    return now
}

module.exports = {
    Highest,
    Lowest,
    MA,
    EMA,
    MACD,
    BOLL,
    KDJ,
    RSI,
    OBV,
    ATR,
    Alligator,
    CMF,
    DMI,
    getDate
}

