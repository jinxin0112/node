const { spawn } = require('child_process');
const path = require('path');

const child = spawn('node', ['3.write.js'], {
    stdio: 'ignore', 
    detached: true, 
    cwd: path.resolve(__dirname, 'child')
})

child.unref();