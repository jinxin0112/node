// open  data end error close
// 读流

const fs = require('fs');
let rs = fs.createReadStream('./a.txt',{
    flags:'r',
    encoding:null,
    mode:0o666,
    start:0,
    end:7,
    highWaterMark:3,
    autoClose:true
})

rs.on('open',()=>{
    console.log('open');
});
rs.on('data',(data)=>{
    console.log(data.toString());
});
rs.on('end',()=>{
    console.log('end');
});
rs.on('close',()=>{
    console.log('close');
});
rs.on('error',(err)=>{
    console.log(`err:${err}`);
});



