# gulp_ECMA6

## setup for GULP type module

unfortunatly we can't get rid of package.json overrides to have no vulnerabilities

npm audit --fix is not effective in this task

you find detailed information on [stack overflow "Why do I keep getting an error when trying to install gulp?"](https://stackoverflow.com/questions/70963372/why-do-i-keep-getting-an-error-when-trying-to-install-gulp)

but in the end we can use the latest npm packages what is at last not bad ;-)

1. clone repository
2. run mpn install
3. Happy coding 🤓

## issue on gulp-imagemin with svg files

as long as you don't need svg's or don't need to minify them everything is fine

[github gulp-imagemin issue tracker](https://github.com/imagemin/imagemin/issues/411)

## found solution:

### got the following error when i wrapped the pipe into try catch block

```
node:internal/process/promises:288
triggerUncaughtException(err, true /_ fromPromise _/);
^
PluginError: Plugin name should be specified
at resolvePluginConfig (C:\Projects\gulp-ecma6\node_modules\svgo\lib\svgo\config.js:113:13).......
```

complete error code at the end

## so I took the options out of the plugins array like this

```
const isProd = process.env.NODE_ENV === "prod";
const { dest } = gulp;
const imgSource = "src/img/**/.";
async function imageMin() {
try {
return gulp.src([imgSource])
.pipe(gulpIf(isProd, imagemin([
gifsicle({ interlaced: true }),
mozjpeg({ quality: 75, progressive: true }),
optipng({ optimizationLevel: 5 }),
svgo({
removeViewBox: true,
cleanupIDs: false
})
])))
.pipe(dest("docs/img/"));
} catch (error) {
console.log(error);
}

}

export default imageMin;
```

### now everything works like acspected

[14:44:22] Finished 'processJson' after 2.68 s
[14:44:23] asset main.js 2.42 KiB [emitted] [minimized] (name: main)

webpack 5.75.0 compiled successfully
[14:44:23] Finished 'processJS' after 3.9 s
[14:44:23] Finished 'default' after 3.92 s
[14:44:24] gulp-imagemin: Minified 17 images (saved 424 kB - 42.6%)

## error code on try catch

```
node:internal/process/promises:288
triggerUncaughtException(err, true /_ fromPromise _/);
^
PluginError: Plugin name should be specified
at resolvePluginConfig (C:\Projects\gulp-ecma6\node_modules\svgo\lib\svgo\config.js:113:13)
at Array.map (<anonymous>)
at optimize (C:\Projects\gulp-ecma6\node_modules\svgo\lib\svgo.js:50:37)
at optimize (C:\Projects\gulp-ecma6\node_modules\svgo\lib\svgo-node.js:97:10)
at C:\Projects\gulp-ecma6\node_modules\imagemin-svgo\index.js:16:17
at file:///C:/Projects/gulp-ecma6/node_modules/p-pipe/index.js:10:25
at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
at async file:///C:/Projects/gulp-ecma6/node_modules/gulp-imagemin/index.js:74:18
Emitted 'error' event on Domain instance at:
at DestroyableTransform.emit (node:domain:540:12)
at DestroyableTransform.onerror (C:\Projects\gulp-ecma6\node_modules\readable-stream\lib_stream_readable.js:640:52)
at DestroyableTransform.emit (node:events:513:28)
at DestroyableTransform.emit (node:domain:489:12)
at C:\Projects\gulp-ecma6\node_modules\through2-concurrent\through2-concurrent.js:41:14
at file:///C:/Projects/gulp-ecma6/node_modules/gulp-imagemin/index.js:97:5
at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
\_\_safety: undefined,
\_stack: undefined,
plugin: 'gulp-imagemin',
showProperties: true,
showStack: false,
fileName: 'C:\\Projects\\gulp-ecma6\\src\\img\\Steinbock.svg',
domainEmitter: DestroyableTransform {
\_readableState: ReadableState {
objectMode: true,
highWaterMark: 16,
buffer: BufferList { head: null, tail: null, length: 0 },
length: 0,
pipes: Pumpify {
\_readableState: ReadableState {
objectMode: true,
highWaterMark: 16,
buffer: BufferList { head: null, tail: null, length: 0 },
length: 0,
pipes: WriteStream {
\_writableState: [WritableState],
writable: true,
\_events: [Object: null prototype],
\_eventsCount: 5,
\_maxListeners: undefined,
\_worker: [Function: sinker],
\_flush: null,
[Symbol(kCapture)]: false
},
pipesCount: 1,
flowing: true,
ended: false,
endEmitted: false,
reading: true,
sync: false,
needReadable: true,
emittedReadable: false,
readableListening: false,
resumeScheduled: false,
destroyed: false,
defaultEncoding: 'utf8',
awaitDrain: 0,
readingMore: false,
decoder: null,
encoding: null
},
readable: true,
\_events: [Object: null prototype] {
end: [ [Function], [Function] ],
close: [ [Function: onclose], [Function] ],
prefinish: [Function (anonymous)],
newListener: [Function: removeSink],
removeListener: [ [Function: removeSink], [Function: addSink] ],
unpipe: [Function: onunpipe],
drain: [Function (anonymous)],
error: [Function: onerror],
finish: [Function: bound onceWrapper] {
listener: [Function: onfinish]
},
data: [Function: ondata]
},
\_eventsCount: 10,
\_maxListeners: undefined,
\_writableState: WritableState {
objectMode: true,
highWaterMark: 16,
finalCalled: false,
needDrain: false,
ending: false,
ended: false,
finished: false,
destroyed: false,
decodeStrings: true,
defaultEncoding: 'utf8',
length: 0,
writing: false,
corked: 0,
sync: true,
bufferProcessing: false,
onwrite: [Function (anonymous)],
writecb: null,
writelen: 0,
bufferedRequest: null,
lastBufferedRequest: null,
pendingcb: 0,
prefinished: false,
errorEmitted: false,
bufferedRequestCount: 0,
corkedRequestsFree: CorkedRequest {
next: null,
entry: null,
finish: [Function (anonymous)]
}
},
writable: true,
allowHalfOpen: true,
\_writable: DestroyableTransform {
\_readableState: ReadableState {
objectMode: true,
highWaterMark: 16,
buffer: [BufferList],
length: 0,
pipes: [DestroyableTransform],
pipesCount: 1,
flowing: true,
ended: false,
endEmitted: false,
reading: true,
sync: false,
needReadable: true,
emittedReadable: false,
readableListening: false,
resumeScheduled: false,
destroyed: false,
defaultEncoding: 'utf8',
awaitDrain: 0,
readingMore: false,
decoder: null,
encoding: null
},
readable: true,
\_events: [Object: null prototype] {
end: [Array],
prefinish: [Function: prefinish],
close: [Array],
finish: [Array],
error: [Array],
data: [Function: ondata],
drain: [Function: ondrain]
},
\_eventsCount: 7,
\_maxListeners: undefined,
\_writableState: WritableState {
objectMode: true,
highWaterMark: 16,
finalCalled: false,
needDrain: false,
ending: false,
ended: false,
finished: false,
destroyed: false,
decodeStrings: true,
defaultEncoding: 'utf8',
length: 0,
writing: false,
corked: 0,
sync: true,
bufferProcessing: false,
onwrite: [Function (anonymous)],
writecb: null,
writelen: 0,
bufferedRequest: null,
lastBufferedRequest: null,
pendingcb: 0,
prefinished: false,
errorEmitted: false,
bufferedRequestCount: 0,
corkedRequestsFree: [CorkedRequest]
},
writable: true,
allowHalfOpen: true,
\_transformState: {
afterTransform: [Function: bound afterTransform],
needTransform: true,
transforming: false,
writecb: null,
writechunk: null,
writeencoding: null
},
\_destroyed: false,
\_transform: [Function: normalize],
[Symbol(kCapture)]: false
},
\_readable: DestroyableTransform {
\_readableState: ReadableState {
objectMode: true,
highWaterMark: 16,
buffer: [BufferList],
length: 0,
pipes: null,
pipesCount: 0,
flowing: null,
ended: false,
endEmitted: false,
reading: true,
sync: false,
needReadable: true,
emittedReadable: false,
readableListening: true,
resumeScheduled: false,
destroyed: false,
defaultEncoding: 'utf8',
awaitDrain: 0,
readingMore: false,
decoder: null,
encoding: null
},
readable: true,
\_events: [Object: null prototype] {
end: [Array],
prefinish: [Function: prefinish],
close: [Array],
finish: [Array],
error: [Array],
unpipe: [Function: onunpipe],
drain: [Function (anonymous)],
readable: [Function: onreadable]
},
\_eventsCount: 8,
\_maxListeners: undefined,
\_writableState: WritableState {
objectMode: true,
highWaterMark: 16,
finalCalled: false,
needDrain: false,
ending: false,
ended: false,
finished: false,
destroyed: false,
decodeStrings: true,
defaultEncoding: 'utf8',
length: 0,
writing: false,
corked: 0,
sync: true,
bufferProcessing: false,
onwrite: [Function (anonymous)],
writecb: null,
writelen: 0,
bufferedRequest: null,
lastBufferedRequest: null,
pendingcb: 0,
prefinished: false,
errorEmitted: false,
bufferedRequestCount: 0,
corkedRequestsFree: [CorkedRequest]
},
writable: true,
allowHalfOpen: true,
\_transformState: {
afterTransform: [Function: bound afterTransform],
needTransform: true,
transforming: false,
writecb: null,
writechunk: null,
writeencoding: null
},
\_destroyed: false,
\_transform: [Function: writeFile],
[Symbol(kCapture)]: false
},
\_readable2: DestroyableTransform {
\_readableState: ReadableState {
objectMode: true,
highWaterMark: 16,
buffer: [BufferList],
length: 0,
pipes: null,
pipesCount: 0,
flowing: null,
ended: false,
endEmitted: false,
reading: true,
sync: false,
needReadable: true,
emittedReadable: false,
readableListening: true,
resumeScheduled: false,
destroyed: false,
defaultEncoding: 'utf8',
awaitDrain: 0,
readingMore: false,
decoder: null,
encoding: null
},
readable: true,
\_events: [Object: null prototype] {
end: [Array],
prefinish: [Function: prefinish],
close: [Array],
finish: [Array],
error: [Array],
unpipe: [Function: onunpipe],
drain: [Function (anonymous)],
readable: [Function: onreadable]
},
\_eventsCount: 8,
\_maxListeners: undefined,
\_writableState: WritableState {
objectMode: true,
highWaterMark: 16,
finalCalled: false,
needDrain: false,
ending: false,
ended: false,
finished: false,
destroyed: false,
decodeStrings: true,
defaultEncoding: 'utf8',
length: 0,
writing: false,
corked: 0,
sync: true,
bufferProcessing: false,
onwrite: [Function (anonymous)],
writecb: null,
writelen: 0,
bufferedRequest: null,
lastBufferedRequest: null,
pendingcb: 0,
prefinished: false,
errorEmitted: false,
bufferedRequestCount: 0,
corkedRequestsFree: [CorkedRequest]
},
writable: true,
allowHalfOpen: true,
\_transformState: {
afterTransform: [Function: bound afterTransform],
needTransform: true,
transforming: false,
writecb: null,
writechunk: null,
writeencoding: null
},
\_destroyed: false,
\_transform: [Function: writeFile],
[Symbol(kCapture)]: false
},
\_autoDestroy: false,
\_forwardDestroy: false,
\_forwardEnd: true,
\_corked: 0,
\_ondrain: null,
\_drained: true,
\_forwarding: false,
\_unwrite: [Function: clear],
\_unread: [Function: clear],
\_ended: false,
[Symbol(kCapture)]: false
},
pipesCount: 1,
flowing: true,
ended: false,
endEmitted: false,
reading: false,
sync: false,
needReadable: true,
emittedReadable: false,
readableListening: false,
resumeScheduled: false,
destroyed: false,
defaultEncoding: 'utf8',
awaitDrain: 0,
readingMore: false,
decoder: null,
encoding: null
},
readable: true,
\_events: [Object: null prototype] {
end: [
[Function: bound onceWrapper] { listener: [Function: onend] },
[Function: bound onceWrapper] { listener: [Function: onend] }
],
prefinish: [Function: prefinish],
data: [Function: ondata]
},
\_eventsCount: 3,
\_maxListeners: undefined,
\_writableState: WritableState {
objectMode: true,
highWaterMark: 16,
finalCalled: false,
needDrain: false,
ending: false,
ended: false,
finished: false,
destroyed: false,
decodeStrings: true,
defaultEncoding: 'utf8',
length: 0,
writing: false,
corked: 0,
sync: false,
bufferProcessing: false,
onwrite: [Function (anonymous)],
writecb: null,
writelen: 0,
bufferedRequest: null,
lastBufferedRequest: null,
pendingcb: 0,
prefinished: false,
errorEmitted: false,
bufferedRequestCount: 0,
corkedRequestsFree: CorkedRequest {
next: null,
entry: null,
finish: [Function (anonymous)]
}
},
writable: true,
\_final: [Function (anonymous)],
allowHalfOpen: true,
\_transformState: {
afterTransform: [Function: bound afterTransform],
needTransform: true,
transforming: false,
writecb: null,
writechunk: null,
writeencoding: 'utf8'
},
\_destroyed: false,
\_transform: [Function: _transform],
\_flush: [Function (anonymous)],
[Symbol(kCapture)]: false
},
domainThrown: false
}

Node.js v18.14.0
```
