// 通过 fs.read 和 fs.write 实现拷贝 可以达到 读一点，写一点的效果

const fs = require('fs');
const path = require('path');


// 小试牛刀 open + write

fs.open(path.join(__dirname, 'e.txt'),'w',(err, fd)=>{ // 没有会创建
    console.log(fd);
    let buffer = Buffer.from('金鑫帅啊');
    let len = buffer.length;
    /**
     *   fd 是一个文件描述符号
     *   buffer 暂存文件的buffer
     *   3 从buffer的哪个位置开始写入
     *   6 写入的长度 不能大于buffer的长度
     *   0 从文件的哪个位置开始读取 
     */
    fs.write(fd, buffer, 0, len, 0, (err, bytesWritten)=>{
        console.log('bytesRead:' + bytesWritten);
        fs.close(fd, ()=>{ // 文件关闭
            console.log('关闭');
        });

    });

});