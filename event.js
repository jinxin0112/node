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
boy.on('恋爱了', smile);
boy.on('恋爱了', smile);
boy.on('恋爱了', eat);
boy.emit('恋爱了');
