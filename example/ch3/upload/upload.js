var formidable = require('formidable');
var app = require('http').createServer(handler);
    util = require('util'),
    fs = require('fs');

var io = require('socket.io')(app);
var fs = require('fs');


function handler (req, res) { 
     if (req.method === 'OPTIONS') {
          var headers = {};
          // IE8 does not allow domains to be specified, just the *
          // headers["Access-Control-Allow-Origin"] = req.headers.origin;
          headers["Access-Control-Allow-Origin"] = "*";
          headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
          headers["Access-Control-Allow-Credentials"] = false;
          headers["Access-Control-Max-Age"] = '86400'; // 24 hours
          headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
          res.writeHead(200, headers);
          res.end();
     }
     else if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.uploadDir = "/Projects/Umbraco 7.3/Umbraco 7.3/media/upload";
        form.keepExtensions = true;
        form.parse(req, function(err, fields, files) {
          var headers = {};
          headers["content-type"] = "application/json";
          headers["Access-Control-Allow-Origin"] = "*";
          res.writeHead(200, headers);
          res.end('{"success": true}');
        });
        form.on('file', function(field, file) {
            fs.rename(file.path, form.uploadDir + "/" + file.name);
        });
        form.on('progress', function(bytesReceived, bytesExpected) {
            io.sockets.in('sessionId').emit('uploadProgress', (bytesReceived * 100) / bytesExpected);
        });

        return;
    }
    else {
        res.writeHead(200);
        res.end('');
    }
    
}
app.listen(5001);

io.on('connection', function (socket) {
    console.log('connect to socket');
    socket.join('sessionId');
});