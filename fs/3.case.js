// 通过 fs.read 和 fs.write 实现拷贝 可以达到 读一点，写一点的效果

const fs = require('fs');
const path = require('path');


// 小试牛刀 open + read

fs.open(path.join(__dirname, 'a.txt'),'r',(err, fd)=>{
    console.log(fd);
    let buffer = Buffer.alloc(15);
    /**
     *   fd 是一个文件描述符号
     *   buffer 暂存文件的buffer
     *   0 从buffer的哪个位置开始写入
     *   5 写入的长度 不能大于buffer的长度
     *   1 从文件的哪个位置开始读取 
     */
    fs.read(fd, buffer, 0, 6, 2, (err, bytesRead)=>{
        console.log('bytesRead:' + bytesRead);
        console.log(buffer.toString());
        fs.close(fd, ()=>{ // 文件关闭
            console.log('关闭');
        });

    });

});