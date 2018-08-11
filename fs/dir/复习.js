// 文件夹文件删除复习
const fs = require('fs');
const path = require('path');

// 同步删除
function removeDirSync(dir) {
    let statObj = fs.statSync(dir);
    if (statObj.isDirectory()) {
        let paths = fs.readdirSync(dir);
        paths.forEach(p => {
            let readPath = path.join(dir, p);
            removeDirSync(readPath);
        });
        fs.rmdirSync(dir);
    } else {
        fs.unlinkSync(dir);
    }
}

// 异步串行删除

function removeDirS(dir, cb) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            fs.readdir(dir, (err, paths) => {
                function next(index) {
                    if (index === paths.length) {
                        return fs.rmdir(dir, cb)
                    }
                    let readPath = path.join(dir, paths[index]);
                    removeDirSyncS(readPath, () => {
                        next(++index);
                    });
                }
                next(0);
            });
        } else {
            fs.unlink(dir, cb);
        }
    });
}

// 异步并行删除

function removeDirP(dir, cb) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            fs.readdir(dir, (err, paths) => {
                if (paths.length > 0) {
                    let i = 0;
                    function done() {
                        i++;
                        if (i === paths.length) {
                            fs.rmdir(dir, cb);
                        }
                    }
                    paths.forEach(p => {
                        let readPath = path.join(dir, p);
                        removeDirSyncP(readPath, done);
                    });
                } else {
                    fs.rmdir(dir, cb);
                }
            });
        } else {
            fs.unlink(dir, cb);
        }
    });
}

// Promise 删除

function removeDirPromise(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, statObj) => {
            if (statObj.isDirectory()) {
                fs.readdir(dir, (err, paths) => {
                    let arr = paths.map(p => {
                        let readPath = path.join(dir, p)
                        return removeDirPromise(readPath);
                    })
                    Promise.all(arr).then(() => {
                        fs.rmdir(dir, resolve);
                    });
                })
            } else {
                fs.unlink(dir, resolve)
            }
        });
    })
}