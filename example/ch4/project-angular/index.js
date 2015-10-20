var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/css', express.static(__dirname + '/css'));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('*', function (request, response) {
    response.status(404).render('pages/404');
});

app.listen(app.get('port'), function() {
    console.log('Web app is running on port', app.get('port'));
});
