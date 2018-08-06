// 并行删除

const fs = require('fs');
const path = require('path');

function removeDir(dir, cb) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            fs.readdir(dir, (err, files) => {
                let paths = files.map(i => path.join(dir, i));
                if (paths.length > 0) {
                    let i = 0;
                    function done() {
                        i++;
                        if (i === paths.length) {
                            removeDir(dir, cb);
                        }
                    }
                    paths.forEach(p => {
                        removeDir(p, done);
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

removeDir('a', () => {
    console.log('删除成功');
});