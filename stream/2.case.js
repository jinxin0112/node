// 写流

const fs = require('fs');

let ws = fs.createWriteStream('./b.txt', {
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    autoClose: true,
    start: 0,
    highWaterMark: 3
});

// ws.write('123456');
// ws.on('drain', () => {
//     console.log('抽干');
// });
let i = 9
function write() {
    let flag = true
    while (i >= 0 && flag) {
        flag = ws.write(i-- + '');
    }
}
write();
ws.on('drain', () => {
    console.log('抽干');
})