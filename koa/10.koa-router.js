const Koa = require('koa');
const Router = require('koa-router');

let app = new Koa();
let router = new Router();
let user = new Router();
let admin = new Router();

user.get('/login/:id', (ctx, next) => {
    ctx.body = `user-login:${ctx.params.id}`;
});
user.get('/reg', (ctx, next) => {
    ctx.body = 'user-reg';
});

admin.get('/login', (ctx, next) => {
    ctx.body = 'admin-login';
});
admin.get('/reg', (ctx, next) => {
    ctx.body = 'admin-reg';
});
router.get('/', (ctx, next) => { });
router.use('/user', user.routes());
router.use('/admin', admin.routes());
app.use(router.routes());

app.listen(3000);