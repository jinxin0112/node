// crypto  加密

// md5 加密是一个不可逆过程， 相同的内容加密出来的结果也相同， 所以可以逆向破解
// 为了防止破解， 可以循环加密多次

const crypto = require('crypto');

let r = crypto.createHash('md5').update('king').digest('base64');

console.log(r);