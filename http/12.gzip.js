// 压缩
// 转换流

const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function gzib(file) { // 压缩
    let transform = zlib.createGzip();
    fs.createReadStream(file).pipe(transform).pipe(fs.createWriteStream(file + '.gz'));
}
gzib('a.txt')

function gunzib(file) { // 解压
    let transform = zlib.createGunzip();
    fs.createReadStream(file).pipe(transform).pipe(fs.createWriteStream(path.basename(fil,'.gz')));
}
gunzib('a.txt.gz')

