const fs = require('fs');
const path = require('path');

// 串行 删除 
function removeDir(dir, cb) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) { // 是否是文件目录
            fs.readdir(dir, (err, files) => {
                let paths = files.map(i => path.join(dir, i));
                function next(index) {
                    if (index === paths.length) {
                        return fs.rmdir(dir, cb);
                    }
                    let curPath = paths[index];
                    removeDir(curPath, () => next(index + 1));
                }
                next(0);
            });
        } else {
            fs.unlink(dir, cb);
        }
    });

}

removeDir('a', () => {
    console.log('删除成功');
});
