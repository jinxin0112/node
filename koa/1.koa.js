const koa = require('koa');

let server = new koa();

server.use((ctx, next)=>{
    ctx.body = 'hello';
    next();
})

server.use((ctx, next)=>{
    ctx.body = 'king';
})

server.listen(3000)