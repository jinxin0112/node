const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

let template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

let obj = {
    name: 'king'
}
function render(r, obj) {
    return r.replace(/<%=([\s\S]*?)%>/g, function(){
        return obj[arguments[1]];
    })
}

let str = render(template, obj);
//let str = ejs.render(template, { name: 'king' });

console.log(str);