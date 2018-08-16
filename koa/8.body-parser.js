const Koa = require('koa');
const fs = require('fs');
const path = require('path');

let app = new Koa();

function bodyParser(ctx) {
    return new Promise((resolve, reject) => {
        let arr = [];
        ctx.req.on('data', data => {
            arr.push(data);
        });
        ctx.req.on('end', () => {
            resolve(Buffer.concat(arr));
        })
    });
}

app.use(async (ctx, next) => {
    if (ctx.path === '/' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html; charset=utf8');
        ctx.body = fs.createReadStream(path.join(__dirname, '1.html'));
    } else {
        await next()
    }
})

app.use(async (ctx, next) => {
    if (ctx.path === '/login' && ctx.method === 'POST') {
        ctx.set('Content-Type', 'text/plain; charset=utf8')
        ctx.body = await bodyParser(ctx);
    }
})

app.listen(3000);