const http = require('http');

http.createServer((req, res)=>{
    let key = req.headers['key']
    if(key === 'king'){
        res.end('king1');
    }else{
        res.end('not find');
    }
}).listen(3001)