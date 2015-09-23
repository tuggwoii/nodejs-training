var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('hello Tak the handsome man!');
});
server.listen(9000);