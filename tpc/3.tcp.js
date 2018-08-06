const net = require('net');

const server = net.createServer();

// 简易的聊天功能

// 存放客户端的socket
let client = [];
// 最大链接数
server.maxConnections = 3;

server.on('connection', socket => {
    client.push(socket);
    server.getConnections((err, count) => {
        socket.write(`当前聊天室一同有${count}人，可以容纳${server.maxConnections}人\r\n`);
    });
    socket.setEncoding('utf8');
    socket.on('data', data => {
        // socket.end(); // 关掉客户端
        // socket.close(); // 让新用户不再链接，但是老用户可以继续链接，等老用户关掉客户端后，就关闭服务器
        // server.unref(); // 没有用户链接或者用户退出后，关闭服务，并不会触发close事件
        data = data.replace(/\r\n/, '');
        client.forEach(c => {
            if (c != socket) {
                c.write(data + '\r\n');
            }
        });
    });
    socket.on('end', function () {
        client = client.filter(c => c != socket)
    });
});

server.listen(3000);

// 当端口占用时，重新监听+1
server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
        server.listen(err.port + 1);
    }
});

// 
server.on('close', () => {
    console.log('服务器关闭');
});