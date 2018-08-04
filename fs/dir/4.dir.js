// 删除文件夹 fs.rmdir

const fs = require('fs');
const path = require('path');

// 先序广度遍历
function remdirSync(dir) {
    let arr = [dir];
    let index = 0;
    let current = 0;
    while (current = arr[index++]) {
        let dirs = fs.readdirSync(current).map(i => path.join(current, i));
        arr = [...arr, ...dirs];
    }
    for(let i = arr.length-1;i>=0;i--){
        fs.rmdirSync(arr[i]);
    }

}

remdirSync('a');