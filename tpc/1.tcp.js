const net = require('net');
const stream = require('stream');

const server = net.createServer();

server.on('connection', socket => {
    // socket 是一个可读可写流  Duplex
    // console.log(socket instanceof stream);
    socket.setEncoding('utf8');
    socket.on('data', data => {
        console.log(data);
    });
    socket.write(`
HTTP/1.1 200 ok
Content-Length: 4

king
    `);
});

server.listen(3000)