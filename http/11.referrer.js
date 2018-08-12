const http = require('http');
const path = require('path');
const urlLib = require('url');
const fs = require('fs');

let whiteList = ['www.king1.cn']
let server = http.createServer((req, res) => {
    let { pathname } = urlLib.parse(req.url);
    let readPath = path.join(__dirname, 'public', pathname);
    let referer = req.headers['referer'] || req.headers['referred'];
    let host = req.headers['host'];
    try {
        let statObj = fs.statSync(readPath);
        if (statObj.isDirectory()) {
            readPath = path.join(readPath, 'index.html');
        }
        if (referer) {
            referer = url.parse(referer).host;
            if (referer === host || whiteList.includes(referer)) {
                fs.createReadStream(readPath).pipe(res);
            } else {
                fs.createReadStream(path.join(__dirname, 'public/2.jpg')).pipe(res);
            }
        } else {
            fs.createReadStream(readPath).pipe(res);
        }
    } catch (error) {
        res.statusCode = 404;
        res.end('not find');
    }
});
server.listen(3000);