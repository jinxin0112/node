const http = require('http');
const querystring = require('querystring');

http.createServer((req, res)=>{
    res.setCooke = function(key ,value, opts) {
        let arr = [];
        if(opts.httpOnly) {
            arr.push(`httpOnly=${opts.httpOnly}`);
        }
        if(opts.maxAge){
            arr.push(`maxAge=${opts.maxAge}`);
        }
        res.setHeader('Set-Cookie', `${key}=${value}; ${arr.join('; ')}`)
    }
    if(req.url === '/visit'){
        res.setHeader('Content-Type','text/html; charset=utf-8')
        let visit = querystring.parse(req.headers['cookie'],'; ')['visit'];
        if(visit){
            res.setCooke('visit',Number(visit)+1,{});
            res.end(`您是第${Number(visit)+1}次访问`);
        }else{
            res.setCooke('visit','1',{});
            res.end(`您是第1次访问`);
        }
    }else{
        res.end();
    }
}).listen(3000);