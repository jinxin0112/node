setTimeout(function(){
    console.log('setTimeout1');   
    Promise.resolve().then(()=>{
        console.log('then1');
    });
});
Promise.resolve().then(()=>{
    console.log('then2');
    Promise.resolve().then(()=>{
        console.log('then3');
    });
    setTimeout(function(){
        console.log('setTimeout2');   
    });
});

// then2 then3 setTimeout1 then1 setTimeout2 (浏览器环境)

setTimeout(function(){
    Promise.resolve().then(()=>console.log('then1'));
},0);
setTimeout(function(){
    console.log(1);
},0);
setTimeout(function(){
    console.log(2);
},0);
setTimeout(function(){
    console.log(3);
},0);

// 1 2 3 then1

setTimeout(()=>{
    console.log('timeout1');
    process.nextTick(()=>{
        console.log('nextTick');
    })
},1000);
process.nextTick(()=>{
    setTimeout(()=>{
        console.log('timeout2');
    },1000)
    console.log('nextTick2');
})
// nextTick2 timeout1 nextTick timeout2 或者 nextTick2 timeout1 timeout2 nextTick
// 取决于node 运行时间

setImmediate(()=>{
    console.log('setImmediate');
});
setTimeout(()=>{
    console.log('setTimeout');
},0);// ->
// setImmediate setTimeout 或者 setTimeout setImmediate
// setTimeout的0 实际值为4 但如果node 运行时间 > 4 则先执行setTimeout

let fs = require('fs');
fs.readFile('./b.json',()=>{
    setImmediate(()=>{
        console.log('setImmediate');
    });
    setTimeout(()=>{
        console.log('setTimeout');
    })
})
// 一定是setImmediate setTimeout 因为文件(io)读取下一个事件队列是check阶段

let fs = require('fs');
setTimeout(()=>{
    Promise.resolve().then(()=>{
        console.log('then2');
    });
},0);
Promise.resolve().then(()=>{
    console.log('then1');
});
fs.readFile('./b.json',()=>{
    process.nextTick(()=>{
        console.log('nextTick');
    });
    setImmediate(()=>{
        console.log('setImmediate');
    })
});

// then1 then2 nextTick setImmediate