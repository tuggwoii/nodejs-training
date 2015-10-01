var http = require('http');
var qs = require('querystring');
var jsonWriter = require("./file-module.js");

const port = 5000;

var server = http.createServer(requestListener);

function requestListener(request, response) {
    if (request.url === '/') {
        successHeader(response)
        responseRequest(response, 'You are requested: ' + request.url + ', by method: ' +request.method);
    }
    else if (request.url === '/form') {
        if (request.method == 'POST') {
            function postResponse (data) {
                successHeader(response)
                if(data.message) {
                    responseRequestWithForm(response, 'You are requested: ' + request.url + ', by method: ' +request.method + ', message: ' + data.message);
                }
                else {
                    responseRequestWithForm(response, 'You are requested: ' + request.url + ', by method: ' +request.method + ', message: ');                            
                }
            }
            handlePost(request, postResponse);
        }
        else {
            successHeader(response)
            responseRequestWithForm(response, 'You are requested: ' + request.url + ', by method: ' +request.method);
        }
        
    }
    else {
        notFoundHeader(response);
        responseRequest(response, 'File not found');
    }
}

server.listen(port, function () {
    console.log("Server start on: http://127.0.0.1:%s", port);
});



function handlePost (request, callback) {
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
            //jsonWriter.writeJSON(data.message, data);
            callback(data);
        });
    }
    else {
        callback();
    }
}

function generateResponse (message) {
    
    return '<!DOCTYPE html>' +
           '<html>' +
                '<head><title>Handle http methods</title></head>' +
                '<body>' + 
                    '<p>' + message + '</p>' +
                '</body>' +
           '</html>';
}
function generateResponseWithForm (message) {
    
    return '<!DOCTYPE html>' +
           '<html>' +
                '<head><title>Handle http methods</title></head>' +
                '<body>' + 
                    '<p>' + message + '</p>' +
                    '<form method="post">'+
                        '<input type="text" name="message" />'+
                        '<button type="submit">Submit</button>'
                    '</form>'+
                '</body>' +
           '</html>';
}

function successHeader (response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
}

function notFoundHeader(response) {
    response.writeHead(404, { 'Content-Type': 'text/html' });
}

function responseRequest (response, message) {
    response.end(generateResponse(message), 'utf-8');
}

function responseRequestWithForm (response, message) {
    response.end(generateResponseWithForm(message), 'utf-8');
}