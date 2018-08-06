// 同步删除
const fs = require('fs');
const path = require('path');

function removeDirSync(dir) {
    let statObj = fs.statSync(dir);
    if (statObj.isDirectory()) {
        let dirs = fs.readdirSync(dir);
        dirs.forEach(p => {
            removeDirSync(path.join(dir, p));
        });
        fs.rmdirSync(dir);
    } else {
        fs.unlinkSync(dir);
    }
}
removeDirSync('a');