const { spawn } = require('child_process');
const path = require('path');

const child = spawn('node', ['-v']); // 再开一个进程去执行某些命令

child.stdout.on('data', (data) => {
    console.log(data.toString());
});