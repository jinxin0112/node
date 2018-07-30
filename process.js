console.log(process.platform); // 本机信息
console.log(process.argv); // 运行参数
let argvs = process.argv.slice(2);
console.log(argvs);
// 将argvs 变成对象形式
let obj = {};
argvs.forEach((item, index) => {
    if (item.includes('--')) {
        obj[item.slice(2)] = argvs[index + 1]
    }
})
console.log(obj);

// 环境变量 
// 使用set NODE_ENV=development 进行设置
console.log(process.env.NODE_ENV);

console.log(process.cwd()); // 当前工作目录
console.log(process.chdir('node')); // 改变当前工作目录

// 在进行目录操作时，用绝对路径比较靠谱

Promise.resolve().then(() => {
    console.log('then');
});
// process.nextTick 为一个微任务，会在同步代码后一丢丢执行
process.nextTick(() => {
    console.log('nextTick');
});
