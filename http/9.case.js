// 文件体 对比

// 304 服务器设置
// 缓存策略：强制缓存 比对缓存 先比一下再走缓存

const http = require('http');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const urlLib = require('url');
const crypto = require('crypto');

let stat = promisify(fs.stat);
http.createServer(async (req, res) => {
    let { pathname, query } = urlLib.parse(req.url, true);
    let readPath = path.join(__dirname, 'public', pathname);
    let md5 = crypto.createHash('md5');
    let arr = [];
    try {
        let statObj = await stat(readPath);
        // res.setHeader('Cache-Control', 'max-age=15');
        // res.setHeader('Expires', new Date(Date.now() + 15 * 1000).toGMTString());
        if (statObj.isDirectory()) {
            readPath = path.join(readPath, 'index.html');
            await stat(p);
        }
        let rs = fs.createReadStream(readPath);
        rs.on('data',data=>{
            md5.update(data);
            arr.push(data);
        });
        rs.on('end',()=>{
            r = md5.digest('base64');
            res.setHeader('ETag',r);
            if(req.headers['if-none-match'] === r){
                res.statusCode = 304;
                res.end();
                return                 
            }
            res.end(Buffer.concat(arr));
        })
    } catch (err) {
        res.statusCode = 404;
        res.end('not find');
    }
}).listen(3000);