let app = {
    middlewares: [],
    use(fn) {
        this.middlewares.push(fn);
    }
}

let logger = function() {
    setTimeout(()=>{
        console.log('log');
    },1000)
}

app.use((next) => {
    console.log(1);
    next();
    console.log(11);
})
app.use(async (next) => {
    console.log(2);
    await logger();
    next();
    console.log(22);
})
app.use((next) => {
    console.log(3);
    //next();
    console.log(33);
})

// function componse() {
//     function dispatch(index) {
//         if (index === app.middlewares.length) return
//         let curFn = app.middlewares[index];
//         curFn(() => dispatch(index + 1));
//     }
//     dispatch(0);
// }

function componse() {
    fn = app.middlewares.reduce((a,b)=>(...args)=>a(()=>b(...args)));
    fn();
}
componse()