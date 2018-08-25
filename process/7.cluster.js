const cluster = require('cluster');
const http = require('http');
const os = require('os');
const path = require('path');

cluster.setupMaster({
    exec:path.join(__dirname, 'worker.js')
})

for(let i=0;i<os.cpus().length-1;i++){
    cluster.fork();
}