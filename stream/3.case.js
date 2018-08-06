// pipe
// copy

const fs = require('fs');

let rs = fs.createReadStream('./a.txt',{
    highWaterMark:3
});

let ws = fs.createWriteStream('./b.txt',{
    highWaterMark:3
});

rs.pipe(ws);
ws.on('drain',()=>{
    console.log('干了');
});