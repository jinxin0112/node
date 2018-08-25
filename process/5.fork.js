const { fork } = require('child_process');
const path = require('path');
const http = require('http');


let child = fork('4.fork.js', ['a', 'b'], {
    cwd: path.resolve(__dirname, 'child'),
    silent: false
})

let server = http.createServer((req, res) => {
    res.end('父：' + process.pid);
});

server.listen(3000);

child.send('server', server);