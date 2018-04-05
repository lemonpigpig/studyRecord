const http = require('http');
const chalk = require('chalk');
var server = http.createServer(function(req, res){
    req.on('data', function(chunk){
        console.log("chunk:", chunk);
    });
    // console.log("接受到了客服端的请求");
    const ip = res.socket.remoteAddress;
    const port = res.socket.remotePort;
    res.writeHeader(200, {'Content-Type':'text/plain;charset=UTF-8'})
    res.write("hahahah hello world");
    res.end(`你的IP地址是 ${ip}，你的源端口是 ${port}。`);
});
server.listen(4000);

server.on('listening', function(res, socket, head){
    console.log('服务器已经监听！');
});
server.on('connection', function(socket) {
    console.log('server reciver connect connect:------------', socket);
})
function checkPort(port) {
    
}
