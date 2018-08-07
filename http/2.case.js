//  client

const http = require('http');

let opts = {
    host: 'localhost',
    port: 3000,
    path: '/king',
    headers: {
        'name': 'king',
        'Content-Type': 'x-www-form-urlencoded',
        'Content-Length': 4
    }
}

let client = http.request(opts, (res) => {
    res.on('data', (data) => {
        console.log(data);
    });
});

client.end('a=1'); // 发送一个请求