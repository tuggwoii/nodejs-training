var formidable = require('formidable');
var app = require('http').createServer(handler);
    util = require('util'),
    fs = require('fs');

var io = require('socket.io')(app);
var fs = require('fs');
var request = require('request');



function handler (req, res) { 
     if (req.method === 'OPTIONS') {
          var headers = {};
          headers["Access-Control-Allow-Origin"] = "*";
          headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
          headers["Access-Control-Allow-Credentials"] = false;
          headers["Access-Control-Max-Age"] = '86400';
          headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
          res.writeHead(200, headers);
          res.end();
     }
     else if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
		var fileName;
		var filePath;
        form.uploadDir = "/Umbraco/Umbraco 7.3/Umbraco 7.3/media/upload";
        form.keepExtensions = true;
        try {
            fs.mkdirSync( form.uploadDir);
        }
        catch (e) {
            if ( e.code != 'EEXIST' ) console.log('error: '+ e.message);
        }
		form.parse(req, function(err, fields, files) {
          var headers = {};
          headers["content-type"] = "application/json";
          headers["Access-Control-Allow-Origin"] = "*";
		  var postData = '?name=' + fileName+'&url=' + filePath;
		  var postUrl = 'http://localhost:4999/umbraco/api/FileApi/PostUploads' + postData;
		  request.post(postUrl, { },
				function (error, response, body) {
					if (!error && response.statusCode == 200) {
						res.writeHead(200, headers);
						res.end('{"success": true}');
						console.log(body)
					}
					else {
						res.writeHead(500, headers);
						res.end('{"success": false}');
					}
				}
		  );
          
        });
        form.on('file', function(field, file) {
			fileName = file.name;
			filePath = '/media/upload/' + file.name;
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