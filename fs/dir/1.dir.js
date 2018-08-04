// 目录操作 创建文件夹 删除文件夹
// 先序深度优先遍历
// 广度优先遍历

const fs = require('fs');

// fs.mkdirSync('a');

// 可以创建多级目录

// 同步
function makepSync(dirs) {
    let path = dirs.split('/');
    for (let i = 0; i < path.length; i++) {
        let dirPath = path.slice(0, i + 1).join('/');
        // 由于不能重复创建， 需要先判断
        try {
            fs.accessSync(dirPath)
        } catch (error) {
            fs.mkdirSync(dirPath);
        }
    }
}

// 异步 通过next 去迭代
function makep(dirs, fn) {
    let paths = dirs.split('/');
    let index = 0;
    if(index===paths.length) return fn();
    function next(){
        let realPath = paths.slice(0,++index).join('/');
        fs.access(realPath,(err)=>{
            if(err){
                fs.mkdir(realPath,(err)=>{
                    next();
                });
            }else{
                next();
            }
        });
    }
    next();
}


makep('a/b/c/d/e',()=>{

})