// 通过 fs.read 和 fs.write 实现拷贝 可以达到 读一点，写一点的效果

const fs = require('fs');
const path = require('path');


const BUFFER_SIZE = 3;
fs.open(path.join(__dirname, 'a.txt'), 'r', (err, rfd) => { // 先打开 读取文件
    fs.open(path.join(__dirname, 'f.txt'), 'w', (err, wfd) => { // 再打开 写入文件 
        function next() { // 递归调用
            let buffer = Buffer.alloc(BUFFER_SIZE);  // 声明一个 buffer 用来暂存
            // offsets 可以写为null ，自增
            fs.read(rfd, buffer, 0, BUFFER_SIZE, null, (err, bytesRead) => {
                // 可能想读10个，但是只读到5个，所以 这里的 length 写 bytesRead
                if (bytesRead > 0) { // 如果 bytesRead > 0 代表读取到了东西
                    fs.write(wfd, buffer, 0, bytesRead, null, (err, bytesWritten) => {
                        console.log('3个ok');
                        next(); // 递归
                    });
                } else {
                    fs.close(rfd, () => {
                        console.log('关闭读');
                    });
                    // 读取完毕 不一定表示写入完毕
                    // 用 fs.fsync()强行写入 再关闭
                    fs.fsync(wfd, () => {
                        fs.close(wfd, () => {
                            console.log('关闭写');
                        })
                    })

                }
            });
        }
        next();
    });

});