# 命令行工具(http-server)

## 范围请求
- 客户端请求：range:bytes=0-5
- 服务端响应：
    - Accept-Ranges: bytes
    - Content-Range: bytes 0-3/7877

## 多语言
- 客户端请求：Accept-Language:zh-CN,zh;q=0.9
- 服务器的响应：content-language: zh-CN

## referer refererred
- 判断当前内容的引用来源

## 缓存
- 强制缓存 cache-control:'max-age=10' Expires:绝对时间
- 对比缓存 
    - Etag / if-none-match 时间
    - Last-modified/ if-modified-since 内容

## host 虚拟主机
- 每次请求时，都会带一个host 主机， 可以通过不同得主机来判断访问的服务

## 请求体的内容类型
- content-type: 'x-www-form-urlencoded'
- content-type: 'application/json'
- content-type: 'multiple/form-part' 表单分段上传 

## compress 服务器压缩
- 客户端请求： Accept-Ecoding：gzip, deflate, br
- 服务器响应: content-encoding: gzip
