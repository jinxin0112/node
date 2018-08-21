class layer {
    constructor(p, cb) {
        this.p = p;
        this.cb = cb;
    }
}

class Router {
    constructor() {
        this.layers = [];
    }
    get(p, cb) {
        this.layers.push(new layer(p, cb));
    }
    componse(ctx, next, routers) {
        function dispatch(index) {
            if (index === routers.length) return next();
            let route = routers[index];
            route(ctx, () => dispatch(index + 1));
        }
        dispatch(0);
    }
    routes() {
        return (ctx, next) => {
            let p = ctx.path;
            let routers = this.layers.filter(layer => layer.p === p).map(l => l.cb);
            this.componse(ctx, next, routers);
        }
    }
}

module.exports = Router;