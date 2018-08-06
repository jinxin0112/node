// promise / async/await 删除

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
let unlink = promisify(fs.unlink);
let rmdir = promisify(fs.rmdir);


// function removePromise(dir) {
//     return new Promise((resolve, reject) => {
//         fs.stat(dir, (err, statObj) => {
//             if (statObj.isDirectory()) {
//                 fs.readdir(dir, (err, dirs) => {
//                     let paths = dirs.map(i => path.join(dir, i));
//                     Promise.all(paths.map(p => removePromise(p))).then(() => {
//                         fs.rmdir(dir, resolve)
//                     })
//                 });
//             } else {
//                 fs.unlink(dir, resolve)
//             }
//         });
//     })
// }

// removePromise('a').then(() => {
//     console.log('删除成功');
// });

async function removeAsync(dir) {
    let statObj = await stat(dir);
    if (statObj.isDirectory()) {
        let dirs = await readdir(dir);
        await Promise.all(dirs.map(p => removeAsync(path.join(dir, p))))
        await rmdir(dir)
    } else {
        await unlink(dir);
    }
}
removeAsync('a').then(() => {
    console.log('删除成功');
});