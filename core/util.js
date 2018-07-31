const util = require('util');
const fs = require('fs');

//console.log(util);
// util.inherits 做继承, 只继承公有方法 Object.setPrototypeOf || function(obj, proto){obj.__proto__ = proto;return obj}
// util.inspect == console.dir
// promisify

let readFile = util.promisify(fs.readFile);
let r = readFile('./b.json');
r.then((data)=>{
    console.log(data);
});
