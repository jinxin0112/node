let proto = {};

function defineGetter(target, property) {
    proto.__defineGetter__(property, function(){
        return this[target][property]
    })
}

function defineSetter(target, property) {
    proto.__defineSetter__(property, function(value){
        this[target][property] = value
    })
}

defineGetter('request', 'path');
defineGetter('request', 'query');
defineGetter('request', 'url');
defineGetter('response', 'body');
defineSetter('response', 'body');
module.exports = proto