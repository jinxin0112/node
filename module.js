// 1.解析出一个绝对路径
// 2.如果文件不存在，则添加 .js .json .node
// 3.查找缓存是否存在
// 4.没有缓存创建模块
// 5.根据文件后缀加载模块
// 6.将新模块加入缓存
// 文件模块 都是相对路径
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function Module(path){
    this.id = path;
    this.exports = {};
}
Module.wrappers = [
    "(function(exports,module,require){"
    ,
    "\n})"
]
Module.wrap = function(script){
    return Module.wrappers[0] + script + Module.wrappers[1]
}
Module.prototype.load = function(filePath){
    let extension = path.extname(filePath);
    Module.extensions[extension](this);
}
Module.catch = {};
Module.extensions = {
    '.js': function (module) {
        let script = fs.readFileSync(module.id, 'utf8');
        let str = Module.wrap(script);
        let fn = vm.runInThisContext(str);
        fn.call(module,module.exports,module,require);
    },
    '.json': function (module) {
        let str = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(str);
        return module.exports;
    }
}
Module._resolveFilename = function (relativePath) {
    if (fs.existsSync(relativePath)) {
        return relativePath
    } else {
        for (let key in Module.extensions) {
            if (fs.existsSync(relativePath + key)) {
                return relativePath + key
            }
        }
    }
    throw new Error('no such file!');
}
function req(p) {
    try {
        let filePath = Module._resolveFilename(p);
        if(Module.catch[filePath]){
            return Module.catch[filePath]
        }
        let module = new Module(filePath);
        module.load(filePath);
        Module.catch[filePath] = module.exports;
        return module.exports
    } catch (e) {
        console.log(e);
    }
}

let a = req('./a');
console.log(a.toString());