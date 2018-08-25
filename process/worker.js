const http = require('http');

http.createServer((req, res) => {
    res.end(process.pid + ':child');
}).listen(3000);