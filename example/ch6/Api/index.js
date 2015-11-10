'use strict';
var express = require('express');
var js2xmlparser = require("js2xmlparser");
var bodyParser = require('body-parser');
var api = require('./server_modules/api-module.js');
var app = express();
var routes = [];

app.set('port', (process.env.PORT || 4000));
app.engine('html', require('ejs').renderFile);
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/css', express.static(__dirname + '/css'));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.json());


function getRoutes (url) {
    var routesArray = url.split('/');
    routesArray.splice(0, 1);
    for (var i = 0; i < routesArray.length; i++) {
        routesArray[i] = routesArray[i].toLowerCase();
    }
    return routesArray;
}

function allowCROS (response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}

function handleRequest (request, response) {
    routes = getRoutes(request.url);
    allowCROS(response);
    if (routes[0] === 'api') {
        api.response(routes, request.method, request.body, function (apiResponse) {
            console.log('Response', apiResponse);
            if (apiResponse.isSuccess !== false) {
                responseRequest(request, response, 200, apiResponse);
            }
            else {
                responseRequest(request, response, apiResponse.status ? apiResponse.status : 404, apiResponse);
            }
        });
    }
    else {
        notFound(request, response);
    }
}

function isAcceptXML (request) {
    return request.headers.accept.indexOf('application/xml') > -1;
}

function responseRequest (request, response, status, obj) {
    if (isAcceptXML(request)) {
        var xmlResponse = {};
        if (obj.length) {
            xmlResponse.item = obj;
        }
        else {
            xmlResponse = obj;
        }
        response.status(status)
        response.set('Content-Type', 'text/xml');
        response.send(js2xmlparser("response", xmlResponse));
    }
    else {
        response.status(status).json(obj);
    }
}

function notFound(request, response) {
    var responseObject = { status: 404, message: 'resource not found' };
    responseRequest(request, response, 404, responseObject);
}

app.get('/', function (request, response) {
    response.render('pages/index');
});

app.get('*', function (request, response) {
    handleRequest(request, response)
});

app.post('*', function (request, response) {
    console.log(request.body);
    handleRequest(request, response)
});

app.put('*', function (request, response) {
    handleRequest(request, response)
});

app.delete('*', function (request, response) {
    handleRequest(request, response)
});

app.listen(app.get('port'), function () {
    /*eslint-disable */
    console.log('Web app is running on port', app.get('port'));
    /*eslint-enable */
});