// 删除文件夹 fs.rmdir

const fs = require('fs');
const path = require('path');

// 先序广度遍历
// function remdirSync(dir) {
//     let arr = [dir];
//     let index = 0;
//     let current = 0;
//     while (current = arr[index++]) {
//         let dirs = fs.readdirSync(current).map(i => path.join(current, i));
//         arr = [...arr, ...dirs];
//     }
//     for (let i = arr.length - 1; i >= 0; i--) {
//         fs.rmdirSync(arr[i]);
//     }

// }

// function remdir(dir, cb) {
//     fs.readdir(dir, (err, files) => {
//         let paths = files.map((item) => path.join(dir, item));
//         if(paths.length>0){
//             paths.forEach((i)=>{
//                 function next(){

//                 }
//                 remdir(i,next)
//             });
//         }else{
//             fs.rmdir(dir,cb)
//         }
//     });
// }

// remdir('a', () => {
//     console.log('删除成功');
// });

function removeDir(dir,cb) { 
    fs.readdir(dir,(err,files)=>{
        let paths = files.map(file=>path.join(dir,file));
        function next(index) {
        // 第一次取出的是a/1.js
        if (index === paths.length) return fs.rmdir(dir,cb);
        let currentPath = paths[index];
        // 文件删除后继续拿出下一项 继续删除
        // 串行删除，删除完第一个，第一个删除完后调用第二个删除的方法
        removeDir(currentPath,()=>next(index+1));
        }
        next(0);
    })
}
removeDir('a',()=>{
  console.log('删除成功');
});





