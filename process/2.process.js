const { spawn } = require('child_process');
const path = require('path');

let child = spawn('node', ['1.child.js','port', '3000'], {
    cwd: path.resolve(__dirname, 'child'),
    stdio: ['pipe', 'pipe', 'pipe','ipc']
});
child.on('message', data => {
    console.log(data.toString());
})
child.on('close', () => {
    console.log('关闭');
})
child.on('exit', () => {
    console.log('退出');
});
child.on('error', (err) => {
    console.log(err);
});