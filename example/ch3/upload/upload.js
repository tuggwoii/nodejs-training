var formidable = require('formidable');
var app = require('http').createServer(handler);
    util = require('util'),
    fs = require('fs');

var io = require('socket.io')(app);
var fs = require('fs');


function handler (req, res) { 
     if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.uploadDir = "./dir";
        form.keepExtensions = true;
        form.parse(req, function(err, fields, files) {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
          res.end(util.inspect({fields: fields, files: files}));
        });
        form.on('file', function(field, file) {
            fs.rename(file.path, form.uploadDir + "/" + file.name);
        });
        form.on('progress', function(bytesReceived, bytesExpected) {
            console.log(form.name +':'+ bytesReceived + '/' + bytesExpected);
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