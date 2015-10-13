var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
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
        console.log(bytesReceived + '/' + bytesExpected);
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );

}).listen(5001, function () {
    console.log('Server run on localhost:5001');   
});