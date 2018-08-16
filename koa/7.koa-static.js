const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');

let app = new Koa();

app.use(koaStatic(path.join(__dirname, 'public')));

// 未找到显示内容
app.use((ctx, next) => {
    ctx.body = 'hello king' 
});

app.listen(3000);