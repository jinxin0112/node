// 实现一个 功能完善一点的 聊天室
// 功能： 私聊、广播、改名、现在在线用户


/**
 * s:name:content
 * b:content
 * r:newName
 * l:
 */

const net = require('net');
const server = net.createServer();

const PORT = 3000;
let client = {};

server.on('connection', socket => {
    let key = socket.remoteAddress + socket.remotePort;
    client[key] = { name: '匿名', socket };
    server.getConnections((err, count) => {
        socket.write(`欢迎加入聊天室，当前在线人数：${count}人\r\n`);
    });
    socket.setEncoding('utf8');
    socket.on('data', (data) => {
        data = data.replace('/\r\n/', '');
        let arr = data.split(':');
        switch (arr[0]) {
            case 's':
                private(arr[1], arr[2], key);
                break
            case 'b':
                broadCast(key, arr[1]);
                break
            case 'r':
                rename(key, arr[1]);
                break
            case 'l':
                list(socket);
                break
            default:
                socket.write('您输入的命令有误\r\n');
        }
    });
});

function list(socket) {
    let list = Object.values(client).map(p => p.name + '\r\n');
    socket.write(`在线用户：\r\n${list}`);
}

function rename(key, newName) {
    client[key].name = newName;
    client[key].socket.write(`您已经将名字修改为${newName}`);
}

function broadCast(key, content) {
    for (let k in client) {
        if (k != key) {
            client[k].socket.write(`${client[k].name}:${content}`);
        }
    }
}

function private(username, content, key) {
    let user = Object.values(client).find(item => item.name == username);
    user.socket.write(`${client[k].name}:${content}`);
}

server.listen(PORT, () => {
    console.log(`server start ${PORT}`);
});