const EventEmitter = require('events');
const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class koa extends EventEmitter {
    constructor() {
        super()
        this.middlewares = []
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
    createContext(req, res) {
        let ctx = this.context;
        ctx.request = this.request;
        ctx.response = this.response;
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
    conponse(ctx, middlewares) {
        function dispatch(index) {
            if (index === middlewares.length) return Promise.resolve()
            let middleware = middlewares[index];
            return Promise.resolve(middleware(ctx, () => dispatch(index + 1)));
        }
        return dispatch(0)
    }
    use(fn) {
        this.middlewares.push(fn);
    }
    handleRequest(req, res) {
        let ctx = this.createContext(req, res);
        let p = this.conponse(ctx, this.middlewares);
        p.then(() => {
            let body = ctx.body;
            res.end(body);
        }).catch(err => {
            this.emit('error', err);
        })
    }
    listen(...args) {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args)
    }
}

module.exports = koa;