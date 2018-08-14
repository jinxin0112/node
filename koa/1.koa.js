const koa = require('./koa');

let server = new koa();

server.use((ctx, next)=>{
    console.log(1);
    ctx.body = 'hello';
    next();
    console.log(11);
})

server.use((ctx, next)=>{
    console.log(2);
    ctx.body = 'king';
    next();
    console.log(22);
})

server.listen(3000)