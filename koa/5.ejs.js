const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

let template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

let obj = {
    name: 'king',
    arr: [1, 2, 3]
}
// function render(r, obj) {

// }

// let str = render(template, obj);
//let str = ejs.render(template, { name: 'king' });
// return r.replace(/<%=([\s\S]*?)%>/g, function(){
//     return obj[arguments[1]];
// })

function render(str, obj) {
    let head = 'let tmp = "" \r\n';
    head += 'with(obj){ \r\n';
    let content = 'tmp+=` \r\n';
    str = str.replace(/<%=([\s\S]*?)%>/g,function(){
        return '${'+arguments[1]+'}'
    })
    content += str.replace(/<%([\s\S]*?)%>/g, function(){
        return '`\r\n' + arguments[1] + '\r\ntmp+=`'
    })
    let tail = '`}\r\n return tmp'
    let fn = new Function('obj', head + content + tail);
    return fn(obj);
}

console.log(render(template,obj));
