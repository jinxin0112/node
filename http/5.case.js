// 断点续传 client

const http = require('http');
const fs = require('fs');

let opts = {
    host: 'localhost',
    port: 3000,
    headers: {}
}

let start = 0;
let pause = false;
process.stdin.on('data', (data) => {
    data = data.toString();
    if (data.includes('p')) {
        pause = true;
    } else if (data.includes('r')) {
        pause = false;
        download();
    }
    console.log(pause);
});

function download() {
    opts.headers.Range = `bytes=${start}-${start + 3}`
    start += 4;
    let client = http.request(opts, (res) => {
        let total = res.headers['content-range'].split('/')[1];
        res.on('data', (data) => {
            fs.appendFileSync('./download.txt', data);
        });
        res.on('end', () => {
            setTimeout(() => {
                if (!pause && start < total) {
                    download();
                }
            }, 1000)
        })
    });
    client.end(); // 必须调用end
}

download()