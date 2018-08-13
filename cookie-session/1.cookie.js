const http = require('http');
const querystring = require('querystring');

http.createServer((req, res) => {
    let cookieArr = [];
    res.setCookie = function (key, value, opts) {
        let arr = [];
        if (opts.httpOnly) {
            arr.push(`httpOnly=${opts.httpOnly}`)
        }
        if (opts.maxAge) {
            arr.push(`maxAge=${opts.maxAge}`)
        }
        cookieArr.push(`${key}=${value}; ${arr.join(';')}`);
        res.setHeader('set-Cookie', cookieArr);
    }

    if (req.url === '/read') {
        let cookies = querystring.parse(req.headers['cookie'],'; ');
        res.end(cookies['name']);
    } else if (req.url === '/write') {
        res.setCookie('name', 'king', { httpOnly: true, maxAge: 10 })
        res.setCookie('age', '25', { httpOnly: true})
        res.end('write ok');
    } else {
        res.end();
    }
}).listen(3000);