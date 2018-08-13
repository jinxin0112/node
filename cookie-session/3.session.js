let http = require('http');

let server = http.createServer();
let uuid = require('uuid/v4')
let SESSION_ID = 'zhufeng_card';
let session = {}
server.on('request',function (req,res) {
    let arr = [];
    res.setCookie = function (key,value,opts={}) {
      let arrs = [];
      if(opts.httpOnly){
        arrs.push(`httpOnly=true`)
      }
      if(opts.maxAge){
        arrs.push(`Max-Age=${opts.maxAge}`)
      }
      arr.push(`${key}=${value}; ${arrs.join('; ')}`)
      res.setHeader('Set-Cookie', arr)
    }
    req.cookies = require('querystring').parse(req.headers.cookie,'; ','=');

    // 第一次你访问服务器的时候
    // session的原理就是将cookie和对应的内容关联起来
    // 用户篡改cookie 服务器就不会找到对应的内容
    
    if(req.url === '/visit'){
      // 第二次你带着卡过来了
      let id = req.cookies[SESSION_ID];
      if (id && session[id]){
        session[id].visit += 1;
        res.end('你是第' + session[id].visit+'次访问了');
      }else{
        // 第一次给你办一张卡 ，
        let cardId = uuid();
        session[cardId] = { visit: 1 }
        res.setCookie(SESSION_ID, cardId);
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end('欢迎第一次来')
      }
    }
});
server.listen(3000);