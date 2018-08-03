const fs = require('fs');
const path = require('path');
// 把整个文件作为一个整体，放置buffer

/**
 * 默认options
 * encoding:uft8  编码
 * mode:0o666 权限 
 * flag: 各种值 r r+ rs w wx w+ wx+ a ax a+ ax+ 
 */

// 异步读取
fs.readFile(path.join(__dirname, 'a.txt'), { encoding: 'utf8' }, (err, data) => {
    if (!err) {
        console.log(data);
    }
});

// 同步读取
let result = fs.readFileSync('./b.json', { encoding: 'utf8' });

// 异步写入
fs.writeFile(path.join(__dirname, 'a.txt'), '{name:"king"}', (err) => {
    console.log(err);
});

// 同步写入
fs.writeFileSync(path.join(__dirname, 'c.txt'), '我是用同步写入的');

// 