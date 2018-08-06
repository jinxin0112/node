// readable

const fs = require('fs');

let rs = fs.createReadStream('./a.txt', {
    highWaterMark: 3
});

rs.on('readable', () => {
    let r = rs.read(2)
    console.log(rs._readableState.length);
    setTimeout(() => {
        console.log(rs._readableState.length);
    }, 500);
});