// md5 摘要 hmac / cookie
// 可以多次调用update 方法

const crypto = require('crypto');

let md5 = crypto.createHash('md5');

md5.update('jin');
md5.update('xin')
let p0 = md5.digest('base64');

let p1 = crypto.createHash('md5').update('jinxin').digest('base64');
console.log(p0);
console.log(p1);
let hmac = crypto.createHmac('sha256', 'jinxin'); // 第一个为算法， 第二个为密钥
let p2 = hmac.update('jinxin').digest('base64');
console.log(p2);