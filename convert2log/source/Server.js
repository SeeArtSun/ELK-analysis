var http = require('http');

function onRequest(request, response){
	response.writeHead(200, {"Context-Type" : "text/plain"});
	response.write("Hello World");
	response.end();
}

http.createServer(onRequest).listen(3000);
console.log("서버 시작했다.");