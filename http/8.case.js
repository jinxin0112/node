// 对比缓存 通过对比修改时间

// 304 服务器设置
// 缓存策略：强制缓存 比对缓存 先比一下再走缓存

const http = require('http');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const urlLib = require('url');

let stat = promisify(fs.stat);

// 时间对比
http.createServer(async (req, res) => {
    let { pathname, query } = urlLib.parse(req.url, true);
    let readPath = path.join(__dirname, 'public', pathname);

    try {
        let statObj = await stat(readPath);
        // res.setHeader('Cache-Control', 'max-age=15');
        // res.setHeader('Expires', new Date(Date.now() + 15 * 1000).toGMTString());
        if (statObj.isDirectory()) {
            readPath = path.join(readPath, 'index.html');
            await stat(p);
        }
        res.setHeader('Last-modified',statObj.ctime.toGMTString());
        if(req.headers['if-modified-since'] === statObj.ctime.toGMTString()){
            res.statusCode = 304;
            res.end();
            return 
        }
        fs.createReadStream(readPath).pipe(res);
    } catch (err) {
        res.statusCode = 404;
        res.end('not find');
    }
}).listen(3000);