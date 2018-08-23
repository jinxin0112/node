const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
let app = new Koa();
let router = new Router();
app.use(bodyParser());
router.get('/', (ctx, next) => {
    ctx.set('Content-Type','text/html;charset=utf8');
    ctx.body = fs.createReadStream(path.join(__dirname, '2.html'));
});
router.post('/submit', (ctx, next) => {
    ctx.body = ctx.request.body;
})
app.use(router.routes());
app.listen(3000);