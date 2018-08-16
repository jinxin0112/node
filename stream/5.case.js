const fs = require('fs');

let rs = fs.createReadStream('a.txt', {
    flags: 'r', // 操作符 r 是读取
    encoding: 'utf8', // 编码，默认null，就是buffer
    autoClose: true, // 读取完成后自动关闭
    highWaterMark: 3, // 每次读取多少 默认是64*1024
    start: 0, // 开始位置
    end: 3 // 结束位置
})

rs.on('data', data => { // 读取
    console.log(data); 
});
rs.on('end', ()=>{ // 结束
    console.log('end');
})

