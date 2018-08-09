// 304 服务器设置
// 缓存策略：强制缓存 比对缓存 先比一下再走缓存

// 强制缓存，设置过期时间
const http = require('http');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const urlLib = require('url');

let stat = promisify(fs.stat);

http.createServer(async (req, res) => {
    let { pathname, query } = urlLib.parse(req.url, true);
    let readPath = path.join(__dirname, 'public', pathname);

    try {
        let statObj = await stat(readPath);
        res.setHeader('Cache-Control', 'max-age=15');
        res.setHeader('Expires', new Date(Date.now() + 15 * 1000).toGMTString());
        if (statObj.isDirectory()) {
            let p = path.join(readPath, 'index.html');
            await stat(p);
            fs.createReadStream(p).pipe(res);
        } else {
            fs.createReadStream(readPath).pipe(res);
        }
    } catch (err) {
        res.statusCode = 404;
        res.end('not find');
    }
}).listen(3000);