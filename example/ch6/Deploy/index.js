'use strict';
var express = require('express');
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

app.get('/', function (request, response) {
    response.render('pages/index');
});

app.get('*', function (request, response) {
    routes = getRoutes(request.url);
    if (routes[0] === 'api') {
        api.response(routes, '', function (apiResponse) {
            response.status(200).json(apiResponse);
        });
    }
    else {
        response.status(404).render('pages/404');
    }
});

app.post('*', function (request, response) {
    routes = getRoutes(request.url);
    if (routes[0] === 'api') {
        api.response(routes, request.body, function (apiResponse) {
            response.status(200).json(apiResponse);
        });
    }
    else {
        response.status(404).render('pages/404');
    }
});

app.listen(app.get('port'), function () {
    /*eslint-disable */
    console.log('Web app is running on port', app.get('port'));
    /*eslint-enable */
});

function getRoutes (url) {
    var routesArray = url.split('/');
    routesArray.splice(0, 1);
    for (var i = 0; i < routesArray.length; i++) {
        routesArray[i] = routesArray[i].toLowerCase();
    }
    return routesArray;
}