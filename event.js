//const EventEmitter = require('events');
const EventEmitter = require('./lib/myEvents');
const util = require('util');

util.inherits(Boy, EventEmitter); //  Object.setPrototypeof

function smile() {
    console.log('smile');
}
function eat(){
    console.log('eat');
}
function Boy() {

}
let boy = new Boy();
/*
boy.on('newListener',(event, listener)=>{ // newListener 会在实例的一个监听器被添加到内部的监听数组之前触发
    console.log(event);
});*/
boy.on('恋爱了', smile);
boy.on('恋爱了', smile);
boy.once('恋爱了', eat);
boy.removeListener('恋爱了',smile);
boy.emit('恋爱了');
