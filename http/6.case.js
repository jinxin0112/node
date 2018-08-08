//  简易爬虫 crawl

const http = require('http');

let opts = {
    host: 'music.taihe.com'
}
let server = http.createServer((req, res) => {
    let client = http.request(opts, (r) => {
        let chars = [];
        r.on('data', (data) => {
            chars.push(data);
        });
        r.on('end', () => {
            let html = Buffer.concat(chars).toString();
            let list = html.match(/<ul class="clearfix tags-1220"(?:[\s\S]*?)<\/ul>/img);
            res.setHeader('Content-Type','text/html;charset=utf8');
            res.end(list.join(''));
        });
    })
    client.end();
});

server.listen(3000)