const http = require('http');
const chalk = require('chalk');
var favicon = require('serve-favicon')
var path = require('path')


// var _favicon = favicon(path.join(__dirname, 'favicon.ico'))
// console.log("_favicon:", _favicon);

var server = http.createServer(function(req, res){
    //每个页面默认都会再发一个/favicon.ico
    console.log("接受到了客服端的请求:", req.url);
    const ip = res.socket.remoteAddress;
    const port = res.socket.remotePort;
//     _favicon(req, res, function onNext (err) {
//         // if (err) return done(err)
    
//         // continue to process the request here, etc.
    
//         // res.statusCode = 404
//         // res.end('oops')
//   })

    var html = "<html><head><title>node--------</title>\
    </head><div>hello World1</div></html>"
    if(req.url!=='/favicon.ico') {
        res.writeHeader(200, {'Content-Type':'text/html;charset=UTF-8'})
        res.write(html);
        res.end(`你的IP地址是 ${ip}，你的源端口是 ${port}。`);
    } else {
        return;
    }
    
    
});
server.listen(4000);

server.on('listening', function(res, socket, head){
    console.log('服务器已经监听！');
});
server.on('connection', function(socket) {
    // console.log('server reciver connect connect:------------', socket);
})
function checkPort(port) {
    
}

// var http=require('http');
// var i=0;
// var req=function(req,res){
// 	i=i+1;
// 	console.log(i,req.url);
// 	res.writeHead(200,{'Content-Type':'text/plain'});
// 	res.end('Hello World\n');
// };

// http.createServer(req).listen(8888,"127.0.0.1");
// console.log('Server running...');
