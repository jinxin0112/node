const http = require('http');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

let server = http.createServer((req, res)=>{
    let rule = req.headers['accept-encoding'].split(', ');
    let readPath = path.join(__dirname,'public/index.html');
    if(rule){
        if(rule.includes('gzip')){
            res.setHeader('Content-Encoding','gzip');
            fs.createReadStream(readPath).pipe(zlib.createGzip()).pipe(res);
        }else if(rule.includes('deflate')){
            res.setHeader('Content-Encoding','deflate');
            fs.createReadStream(readPath).pipe(zlib.createDeflate()).pipe(res);
        }else{
            fs.createReadStream(readPath).pipe(res);
        }
    }else{
        fs.createReadStream(readPath).pipe(res);
    }


})
server.listen(3000)