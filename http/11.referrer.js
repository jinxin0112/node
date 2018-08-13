const http = require('http');
const path = require('path');
const urlLib = require('url');
const fs = require('fs');

let whiteList = []
let server = http.createServer((req, res) => {
    let { pathname } = urlLib.parse(req.url);
    let readPath = path.join(__dirname, pathname);
    fs.stat(readPath, (err, statObj)=>{
        if(err){
            res.statusCode = 404;
            res.end('not find');
        }else{
            if (statObj.isDirectory()) {
                readPath = path.join(readPath, 'public/index.html');
            }
            let referer = req.headers['referer'] || req.headers['referred']; // 使用页面
            let host = req.headers['host']; // 图片host
            if (referer) {
                referer = urlLib.parse(referer).host;
                if (referer === host || whiteList.includes(referer)) {
                    fs.createReadStream(readPath).pipe(res);
                } else {
                    fs.createReadStream(path.join(__dirname, 'public/2.jpg')).pipe(res);
                }
            } else {
                fs.createReadStream(readPath).pipe(res);
            }
        }
    });

});
server.listen(3000);