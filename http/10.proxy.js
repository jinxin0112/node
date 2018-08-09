// 代理
// 反向代理

const http = require('http');
const httpProxy = require('http-proxy');

let proxyServer = httpProxy.createProxy();
let map = {
    'www.king1.cn': 'http://localhost:3001',
    'www.king2.cn': 'http://localhost:3002'
}

http.createServer((req, res) => {
    let target = req.headers['host'];
    proxyServer.on('proxyReq', (proxyReq, req, res, opts)=>{
        proxyReq.setHeader('key', 'king'); // 设置标识， 必须通过该代理才能访问
    })
    proxyServer.web(req, res, {
        target: map[target]
    })
}).listen(80);