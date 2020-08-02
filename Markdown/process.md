# process
process核心模块提供了一种便利的的方法，可以以编程的方式退出node.js：pprocess.exit()。

可以传入一个整数，向操作系统发送退出码：
```javascript
process.exit(1)
```
默认情况下，退出码为0，表示成功。

不同的退出码具有不同含义，也可以手动设置。
```javascript
process.exitCode = 1
```
当程序结束时，Node.js会返回该退出码。

*注意：process 不需要 "require"，它是自动可用的。*

```javascript
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('进程已终止')
  })
});
```
*什么是信号？信号是一个 POSIX 内部通信系统：发送通知给进程，以告知其发生的事件。*

**SIGKILL** 是告诉进程要立即终止的信号，理想情况下，其行为类似于 process.exit()。

**SIGTERM** 是告诉进程要正常终止的信号。它是从进程管理者（如 upstart 或 supervisord）等发出的信号。

可以从程序内部另一个函数中发送此信号：
```javascript
process.kill(process.pid, 'SIGTERM');
```