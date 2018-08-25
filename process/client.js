const http = require('http');

for (let i = 0; i < 1000; i++) {
    http.get({
        host: 'localhost',
        port: 3000
    }, res => {
        res.on('data', data => {
            console.log(data.toString());
        })
    })
}