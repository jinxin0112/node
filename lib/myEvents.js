function EventEmitter() {
    this._events = {};
    this.defaultMaxListeners = 10;
}
EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
}
EventEmitter.prototype.listeners = function (eventName) {
    return this._events[eventName];
}
EventEmitter.prototype.listenerCount = function (eventName) {
    return this._events[eventName].length;
}
EventEmitter.prototype.setMaxListeners = function (n) {
    if (n === 'Infinity' || n === 0) {
        return this.defaultMaxListeners = 0;
    } else if (isNaN(n) && n > 0) {
        throw new TypeError('Wrongful arg');
    }
}
EventEmitter.prototype.getMaxListeners = function () {
    return this.defaultMaxListeners;
}
EventEmitter.prototype.on = function (eventName, callback, flag) {
    if (!this._events) this._events = Object.create(null);
    if (!this._events[eventName]) this._events[eventName] = [];
    if (this._events['newListener']) this.emit('newListener', eventName);
    if (this._events[eventName].length >= this.defaultMaxListeners) {
        console.warn('MaxListenersExceededWarning');
    }
    if(flag){
        this._events[eventName].unshift(callback);
    }else{
        this._events[eventName].push(callback);
    }
}

EventEmitter.prototype.emit = function (...arg) {
    // node 源码里 还对 eventName === 'error' 进行了判断
    let eventName = arg[0];
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => fn.call(this, eventName === 'newListener' ? arg[1] : arg[0]));
    } else {
        throw new Error('unknown event');
    }
}

EventEmitter.prototype.off = function (event, listener) {
    return this._events[event].filter(fn => fn != listener);
}
function _onceWrap (target, eventName, listener) {
    return function(){
        listener();
        target.off(eventName, listener);    
    }
}
EventEmitter.prototype.once = function (eventName, listener) {
    this.on(eventName, _onceWrap(this, eventName, listener));
}
EventEmitter.prototype.prependListener = function(eventName, listener){
    this.on(eventName, listener, true);
}
EventEmitter.prototype.prependOnceListener = function(eventName, listener){
    this.prependListener(eventName, _onceWrap(this, this, eventName, listener));
}
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

module.exports = EventEmitter;