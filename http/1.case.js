const http = require('http');

let server = http.createServer();

// server.on('connection',(socket)=>{ // 跟tcp的socket 一样 
//     console.log(socket); // 但是http 并不希望直接操作socket
//     // 内部进行处理 发射 request 事件
//     // this.emit('request', req, res);
// });

server.on('request', (req, res) => {
    console.log(req.method); // 请求方式 GET ， 大写
    console.log(req.url); // 请求路径
    console.log(req.httpVersion); // 请求版本号 
    console.log(req.headers); // 所以值都是小写，node 已经处理好了

    req.on('data', (data) => {
        console.log(data);
    });
    req.on('end', () => {
        console.log('end');
        res.statusCode = 404;
        // res.setHeader('Content-Type','text/html');
        // res.sendDate = false

        res.end();
    })
});

server.listen(3000)