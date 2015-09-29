//GET HTTP NODE MODULES
var http = require('http');

//DEFINE PORT
const port = 5000;

//CREATE SERVER
var server = http.createServer(requestListener);

//CREATE requestListener FUNCTION
function requestListener(request, response) {
    response.end('You are requested: ' + request.url);
}

//RUN SERVER
server.listen(port, function () {
    console.log("Server start on: http://127.0.0.1:%s", port);
});