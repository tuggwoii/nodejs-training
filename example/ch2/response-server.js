var http = require('http');

const port = 8080;

var server = http.createServer(requestListener);

function requestListener(request, response) {
    handleRoutes(request.url, response);
}

server.listen(port, function () {
    console.log("Server start on: http://127.0.0.1:%s", port);
});

function handleRoutes (routes, response) {
    console.log(routes);
    if (routes === '/') {
        successHeader(response)
        responseText(response, 'Home page');
    }
    else {
        notFoundHeader(response);
        responseText(response, 'File not found');
    }
}

function successHeader (response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
}

function notFoundHeader(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
}

function responseText(response, text) {
    response.end(text);
}