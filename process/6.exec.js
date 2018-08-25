const { exec, execFile } = require('child_process');

exec('node -v', (err, data)=>{
    console.log(data);
})

execFile('node', ['-v'], (err, data)=>{
    console.log(data);
})