## node概念 常见概念 进程和线程

## 进程和线程

## 异步 同步

## 阻塞非阻塞

## 事件环（浏览器的事件环 node事件环）

## 队列 和 栈

## node的应用场景 

## 中间层 服务端渲染
- 并发量


## js的组成 ECMAScript (BOM DOM)

> 开发node 离不开大量第三方模块

## js解析器和 ui 线程  是共同线程的
- js 操作 dom  必须是单线程（编程模型更加简单）
- java 锁的问题

## webworker 工作线程
- 多线程（不能操作文档，不能操作dom....）

## 宏任务 微任务 （异步操作）
- 宏任务: setTimeout setImmidate(ie) messageChannel
- 微任务: Promise.then MutationObserver

## nextTick 下一个队列
