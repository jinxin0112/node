const Koa = require('koa');
//const koaViews = require('koa-views');
const path = require('path'); 
const fs = require('fs');
const {promisify} = require('util');

let readFile = promisify(fs.readFile);
let app = new Koa();

function myViews(dir, opts) {
    return async function(ctx, next){
        ctx.render = async function(tmp, obj){
            let realPath = path.join(dir, tmp+'.'+opts.extension);
            r = require(opts.extension);
            let data = await readFile(realPath, 'utf8');
            ctx.body = r.render(data, obj);
        }
        await next()
    }
}

// app.use(koaViews(path.join(__dirname, 'views'), {
//     extension: 'ejs'
// }))
app.use(myViews(path.join(__dirname, 'views'), {
    extension: 'ejs'
}))

app.use(async (ctx, next)=>{
    await ctx.render('index', {
        name:'king'
    });
})

app.listen(3000);