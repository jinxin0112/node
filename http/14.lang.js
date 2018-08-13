const http = require('http');

let langs = { // 语言包
    en: 'hello world',
    'zh-CN': '你好世界',
    zh: '你好',
    ja: 'こんにちは、世界'
}
let defaltLang = 'en';
http.createServer((req, res) => {
    let lan = req.headers['accept-language'].split(',');
    res.setHeader('Content-Type','text/html;charset=utf8');
    if(lan){
        lan = lan.map(i => {
            let [name, weight] = i.split(';');
            weight = weight ? Number(weight.split('=')[1]) : 1;
            return { name, weight }
        }).sort((a, b) => b.weight - a.weight)
        for(let i =0;i<lan.length;i++) {
            if(langs[lan[i].name]){
                return res.end(langs[lan[i].name]);
            }
        }
        res.end(langs[defaltLang]);
    }else{
        res.end(langs[defaltLang]);
    }
}).listen(3000)