const fs = require('fs');
const path = require('path');


// 像文件中续写
// fs.appendFile(path.join(__dirname, 'a.txt'),'{data:8}',(err)=>{

// });

// 文件拷贝

// 方法1：
// 缺点： 回调痛点 不能读一点写一点，如果文件较大，内存遭不住

fs.readFile(path.join(__dirname, 'a.txt'), (err, data) => {
    fs.writeFile(path.join(__dirname, 'b.txt'), data, (err) => {

    });
});

// 方法二：
// 缺点： 也是处理大文件的时候，遭不住
fs.copyFile(path.join(__dirname, 'a.txt'),path.join(__dirname, 'd.txt'),(err)=>{

});

// 方法三：
// 见3.case.js 
