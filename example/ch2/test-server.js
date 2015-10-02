//GET HTTP NODE MODULES
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var json = require('./file-module.js');

var routes = [];
//DEFINE PORT
const port = 5000;

//CREATE SERVER
var server = http.createServer(requestListener);

function getRouteByUrl(url) {
    var response = 0;
    routes.forEach(function (route) {
        if (route.url === url.toLowerCase() || (route.url + '/') === url.toLowerCase()) {
            response = route;
        }
    });
    return response;
}

//CREATE requestListener FUNCTION
function requestListener(request, response) {
    var currentRoute = getRouteByUrl(request.url);
    if (request.url === "/") {
            if (request.method == 'POST') {
                function postResponse(data) {
                    successHeader(response)
                    if (data) {
                        console.log(data);
                        responseJSONFile('resources/' + data.name + '.json', response);
                    }
                    else {
                        //responseRequestWithForm(response, 'You are requested: ' + request.url + ', by method: ' + request.method + ', message: ');
                    }
                }
                handlePost(request, postResponse);
            }
            else {
                successHeader(response);
                responseFile(response, 'resources/home.html');
            }
    }
    else if (request.url === "/logo.png") {
        responseBinaryFile(response);
    }
    else if (currentRoute) {
        responseText(response, currentRoute.response);
    }
    else {
        if (request.method == 'PUT') {
                var route = {
                    url: request.url,
                    response: 'You create page: ' + request.url
                };
                routes.push(route);
                successHeader(response);
                responseText(response, 'success');

        }
        else {
            notFoundHeader(response);
            responseText(response, 'File not found');
        }
        
    }
}

//RUN SERVER
server.listen(port, function () {
    console.log("Server start on: http://127.0.0.1:%s", port);
});
function successHeader(response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
}
function notFoundHeader(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
}
function responseText(response, text) {
    response.end(text);
}
function responseFile(response, url) {
    fs.readFile(url, function (error, content) {
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end();
        }
        else {
            response.end(content, 'utf-8');
        }
    });
}
function responseBinaryFile(response) {
    var img = fs.readFileSync('resources/logo.png');
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.end(img, 'binary');
}
function handlePost(request, callback) {
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            if (body.length > 1e6) {
                request.connection.destroy();
            }
        });
        request.on('end', function () {
            var data = qs.parse(body);
            json.writeJSON(data.name, data);
            callback(data);
        });
    }
    else {
        callback();
    }
}

function responseJSONFile(url, response) {
    fs.readFile(url, function (error, content) {
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end();
        }
        else {
            response.end(content, 'utf-8');
        }
    });
}