// 文件创建 async / await 版本

const fs = require('fs');
const util = require('util');

function promisify(fn) {
    return function(...args){
        return new Promise((resolve, reject)=>{
            args[args.length] = (err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            }
            fn.apply(this, args)
        })
    }
}

//let access = util.promisify(fs.access);
//let makedir = util.promisify(fs.mkdir);
let access = promisify(fs.access);
let makedir = promisify(fs.mkdir);

async function makep(p){
    let paths = p.split('/');
    for(let i = 0;i<paths.length;i++){
        let dirPath = paths.slice(0,i+1).join('/');
        try {
            await access(dirPath);
        } catch (error) {
            await makedir(dirPath);
        }
    } 
}

makep('a/b/c/d/e').then(()=>{
    console.log('创建成功');
});