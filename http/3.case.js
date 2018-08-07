const http = require('http');
const querystring = require('querystring');

let server = http.createServer();

server.on('requset', (req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.httpVersion);
    console.log(req.headers);

    let arr = [];
    req.on('data', (data) => {
        arr.push(data);
    });

    req.on('end', (data) => {
        let r = Buffer.concat(arr).toString();

        if (req.headers['content-type'] === 'x-www-form-encoded') {
            r = querystring.parse(r);
        } else if (req.headers['content-type'] === 'application/json') {
            r = JSON.parse(r);
        }

        console.log(r);

        res.end();
    })
});