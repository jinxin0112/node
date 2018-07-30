function EventEmitter() {
    this._events = {};
}
EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._events) this._events = Object.create(null);
    if (!this._events[eventName]) this._events[eventName] = [];
    this._events[eventName].push(callback);
}

EventEmitter.prototype.emit = function (eventName) {
    if(this._events[eventName]){
        this._events[eventName].forEach(fn=>fn());
    }else{
        throw new Error('unknown event');
    }
}

module.exports = EventEmitter;