// 基本用法

const Koa = require('koa');
const Router = require('./koa-router');

let app = new Koa();
let router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = 'hello king';
})

router.get('/a', (ctx, next) => {
    ctx.body = 'hello gyh';
})

app.use(router.routes());
app.use((ctx, next) => {
    ctx.body = '404'; 
});
app.listen(3000);