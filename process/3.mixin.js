const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

let fd = fs.openSync(path.join(__dirname, '1.txt'), 'w');
let child = spawn('node', ['1.child.js','port','xxx'], {
    cwd: path.resolve(__dirname, 'child'),
    stdio: ['ignore', 'pipe', fd, 'ipc']
});
let other = spawn('node', ['2.write.js'], {
    cwd: path.resolve(__dirname, 'child'),
    stdio: ['ignore', 'pipe', fd]
});

child.on('message', (data)=>{
    if(data.toString()==='close'){
        fs.fsyncSync(fd);
    }else{
        other.stdout.write(data);
    }
});