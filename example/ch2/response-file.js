var http = require('http');
var fs = require('fs');

const port = 5000;

var server = http.createServer(requestListener);
var routes = JSON.parse(fs.readFileSync('resources/html-routes.json', 'utf8'));


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
        responseFile(response, route);
    }
    else if(url === '/logo.png') {
        responseBinaryFile(response);
    }
    else {
        notFoundHeader(response);
        responseText(response, 'File not found');
    }
}

function successHeader(response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
}

function notFoundHeader(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
}

function responseText(response, text) {
    response.end(text);
}

function responseFile (response, route) {
    fs.readFile(route.response, function(error, content) {
		if (error) {
			response.writeHead(500, { 'Content-Type': 'text/html' });
			response.end();
		}
		else {
			response.end(content, 'utf-8');
		}
	});
}

function responseBinaryFile (response) {
    var img = fs.readFileSync('resources/logo.png');
    response.writeHead(200, {'Content-Type': 'image/png' });
    response.end(img, 'binary');
}

startServer(port);