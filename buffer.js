// buffer 重要方法 Buffer.from() / Buffer.alloc();

let b = Buffer.alloc(6); // buffer中存的是2进制数据 ，但是为了方便显示，显示16进制
console.log(b);

console.log(Buffer.from([1111, 2, 3]));

console.log(Buffer.from('金鑫'));

// 默认情况 buffer 不支持 gbk 编码
// 可以通过第三方包去处理乱码 iconv-lite

// indexOf 第二个参数为从第几位开始找
console.log(Buffer.from('金鑫真帅鑫').indexOf('鑫', 4));

// slice 截取
let bf = Buffer.from('金鑫真帅鑫帅');
let sbf = bf.slice(0, 6);
console.log(sbf.toString());
console.log(0x87);

// split
Buffer.prototype.mySplit = function (sep) { // 自己实现，靠谱性待验证
    let arr = this.toString().split(sep)
    return arr.map(i => Buffer.from(i));
}
Buffer.prototype.split = function (sep) { // 大佬实现 ， 同理 字符串的split 也可以这样去实现
    let pos = 0;
    let index = 0;
    let arr = [];
    let len = Buffer.from(sep).length;
    while (-1 != (index = this.indexOf(sep, pos))) {
        arr.push(this.slice(pos, index));
        pos = index + len;
    }
    arr.push(this.slice(pos));
    return arr;
}
console.log(bf.mySplit('鑫'));
console.log(bf.split('鑫'));

// copy
let buffer = Buffer.alloc(12);
let b1 = Buffer.from('金鑫');
let b2 = Buffer.from('真的好帅');
Buffer.prototype.copy = function (target, targetStart = 0, sourceStart = 0, sourceEnd = this.length) {
    for (let i = sourceStart; i < sourceEnd; i++ , targetStart++) {
        target[targetStart] = this[i]
    }
}
b1.copy(buffer);
b2.copy(buffer, 6, 6, 12);
console.log(buffer.toString());

// concat
Buffer.concat = function (bufferArr, len) {
    len = typeof len === 'undefined' ? bufferArr.reduce((prev, cur) => { return prev + cur.length }, 0) : len;
    let resBuffer = Buffer.alloc(len);
    bufferArr.reduce((prev, cur, index) => {
        bufferArr[index].copy(resBuffer, prev);
        return prev + cur.length
    }, 0);
    return resBuffer
}
let b3 = Buffer.concat([b1, b2, b1],10);
console.log(b3.toString());