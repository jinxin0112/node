const http = require('http');
const os = require('os');

process.on('message', (data, s)=>{
    if(data==='server'){
        for(let i = 0; i< os.cpus().length-1; i++){
            http.createServer((req, res)=>{
                res.end('子：'+process.pid);
            }).listen(s);
        }
    }
})
