// 断点续传 server

const http = require('http');
const fs = require('fs');

let server = http.createServer();
let size = fs.statSync('./a.txt').size;
server.on('request', (req, res) => {
    let range = req.headers['range'];
    // range:bytes 0-4
    if (range) {
        let [, start, end] = range.match(/(\d*)-(\d*)/);
        start = start ? Number(start) : 0;
        end = end ? Number(end) : size - 1;
        res.setHeader('Content-Range', `bytes ${start}-${end}/${size-1}`);
        fs.createReadStream('./a.txt', { start, end }).pipe(res);
    } else {
        fs.createReadStream('./a.txt').pipe(res);
    }

});

server.listen(3000);

