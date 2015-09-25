var http = require('http');
var simpleWebServer = require('./web-server');
var port = '8080';

simpleWebServer.run(http, port);