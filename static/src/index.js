// 系统模块
const http = require('http');
const util = require('util');
const urlLib = require('url');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
// 第三方
const ejs = require('ejs');
const chalk = require('chalk');
const mime = require('mime');
const debug = require('debug')('king');
const config = require('./config');

let stat = util.promisify(fs.stat);
let readdir = util.promisify(fs.readdir);
let template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf8');


// Server

class Server {
    constructor(commander) {
        this.config = { ...config, ...commander };
        this.template = template;
    }
    async handleRequest(req, res) {
        let { pathname } = urlLib.parse(req.url, true);
        let realPath = path.join(this.config.dir, pathname);
        debug(realPath);
        try {
            let statObj = await stat(realPath);
            if (statObj.isDirectory()) {
                let dirs = await readdir(realPath);
                dirs = dirs.map(item => ({
                    name: item,
                    href: path.join(pathname, item)
                }));
                let str = ejs.render(this.template, {
                    name: `Index of ${pathname}`,
                    arr: dirs
                });
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(str);
            } else {
                this.sendFile(req, res, statObj, realPath);
            }
        } catch (e) {
            this.sendError(req, res, e);
        }
    }
    cache(req, res, statObj, realPath) {
        res.setHeader('Cache-Control', 'max-age=10');
        res.setHeader('Expires', new Date(Date.now() + 10 * 1000).getTime());
        let etag = statObj.ctime.getTime() + '-' + statObj.size;
        let lastModified = statObj.ctime.getTime();
        res.setHeader('Etag', etag);
        res.setHeader('Last-Modified', lastModified);
        let ifNoneMatch = req.headers['if-none-match'];
        let ifModifiedSince = req.headers['if-modified-since'];
        if (etag !== ifNoneMatch && lastModified !== ifModifiedSince) {
            return false
        }
        return true
    }
    gzip(req, res, statObj, realPath) {
        let encoding = req.headers['accept-encoding'];
        if (encoding) {
            if (encoding.match(/\bgzip\b/)) {
                res.setHeader('Content-Encoding', 'gzip');
                return zlib.createGzip();
            }
            if (encoding.match(/\bdeflate\b/)) {
                res.setHeader('Content-Encoding', 'deflate');
                return zlib.createDeflate();
            }
            return false
        } else {
            return false
        }
    }
    range(req, res, statObj, realPath) {
        let range = req.headers['range'];
        if (range) {
            let [, start, end] = range.macth(/(\d*)-(\d*)/);
            start = start ? Number(start) : 0;
            end = end ? Number(end) : statObj.size - 1;
            res.statusCode = 206;
            res.setHeader('Accept-Range', 'bytes')
            res.setHeader('Content-Range', `bytes ${start}-${end}/${statObj.size - 1}`)
            fs.createReadStream(realPath, { start, end }).pipe(res);
        } else {
            return false
        }
    }
    sendFile(req, res, statObj, realPath) {
        if (this.cache(req, res, statObj, realPath)) {
            res.statusCode = 304;
            return res.end();
        }
        if (this.range(req, res, statObj, realPath)) return
        res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf-8');
        let transform = this.gzip(req, res, statObj, realPath);
        if (transform) {
            return fs.createReadStream(realPath).pipe(transform).pipe(res);
        }
        fs.createReadStream(realPath).pipe(res);
    }
    sendError(req, res, e) {
        res.statsCode = 404;
        res.end('not find');
    }
    start() {
        let { port, host } = this.config;
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(port, host, () => {
            debug(`server start http://${host}:${chalk.green(port)}`)
        });
    }
}

module.exports = Server;