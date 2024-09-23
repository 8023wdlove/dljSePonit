


//判断数据类型
const _toString = Object.prototype.toString;
const toRawType = value => _toString.call(value).slice(8, -1)


// //节流防抖，一个是在滚完之后触发，一个是滚动时每隔一定时间触发
// let last = 0;
// export const Throttle = (method, context) => {
//     var nowTime = Date.now();
//     if (nowTime - last > 30) {
//         last = nowTime;
//         method.call(context)
//     }
// }


// let last2 = 0;
// export const Throttle2 = (method, context) => {
//     var nowTime = Date.now();
//     if (nowTime - last2 > 100) {
//         last = nowTime;
//         method.call(context)
//     }
// }


console.log(new Date(1721664001000))
let ttt = new Date(1721664000000)
let day = ttt.getDate()
console.log(day)
console.log(new Date(1722355200000))