// console.log(global);
// 可以通过直接取值的方式拿，不需要引入或者声明

// console
console.log('log');
process.stdout.write('hello');
console.info('info'); // 标准输出0

console.error('错误');
process.stderr.write('hello');
console.warn('警告'); // 错误输出1
// 监听用户的输入
process.stdin.on('data',function(data){ // 0
    console.log(data);
});

//console.assert(1!==1,'出错了');

// process

console.log(process);
// Buffer
// clearImmediate / setImmediate