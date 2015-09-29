var http = require('http');
var fs = require('fs');

const port = 5000;

var server = http.createServer(requestListener);
var routes = JSON.parse(fs.readFileSync('resources/routes.json', 'utf8'));


function requestListener(request, response) {
    handleRoutes(request.url, response);
}

function startServer(port) {
    server.listen(port, function () {
        console.log("Server start on: http://127.0.0.1:%s", port);
    });
}

function getRouteByUrl (url) {
    var response = 0;
    routes.forEach(function(route){
        if(route.url === url.toLowerCase() || (route.url + '/') === url.toLowerCase()) {
            response = route;
        }
    });
    return response;
}

function handleRoutes(url, response) {
    console.log('user request path: ' + url);
    var route = getRouteByUrl(url);
    if (route) {
        successHeader(response)
        responseText(response, route.response);
    }
    else {
        notFoundHeader(response, url);
        responseText(response, 'File not found');
    }
}

function successHeader(response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
}

function notFoundHeader(response, url) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
}

function responseText(response, text) {
    response.end(text);
}

startServer(port);