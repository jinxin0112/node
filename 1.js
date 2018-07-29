// 1-2-3 => 3-2-1
// 执行上下文(栈) 先进后出
function one(){
    function two(){
        function three(){

        }
        three()
    }
    two()
}
one()

// 队列 先进先出 顺序不会乱 隔多少秒放入执行队列
setTimeout(function(){
    console.log(1);
},1000);
setTimeout(function(){
    console.log(2);
},1000);
setTimeout(function(){
    console.log(3);
},1000);