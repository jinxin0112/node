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

