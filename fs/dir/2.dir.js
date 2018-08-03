let fs = require('fs');

// 删除即带 内容 又带 目录
// 先 读 fs.readdir
// 根据 fs.stat 去判断是文件夹还是文件
// 