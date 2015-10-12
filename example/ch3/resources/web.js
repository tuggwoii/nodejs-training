var fs = require('fs');
var exec = require('child_process').exec;

var content = {
    indexjs: function () {
        return "var express = require('express');\n"+
               "var app = express();\n" +
               "app.set('port', (process.env.PORT || 5000));\n" +
               "app.engine('html', require('ejs').renderFile);\n" +
               "app.use('/node_modules', express.static(__dirname + '/node_modules'));\n" +
               "app.use('/images', express.static(__dirname + '/images'));\n" +
               "app.use('/scripts', express.static(__dirname + '/scripts'));\n" +
               "app.use('/views', express.static(__dirname + '/views'));\n" +
               "app.set('views', __dirname + '/views');\n" +
               "app.set('view engine', 'html');\n" +
               "app.get('/', function(request, response) {\n" +
               "response.render('pages/index');\n" +
               "});\n" +
               "app.get('*', function (request, response) {\n" +
               "response.status(404).render('pages/404');\n" +
               "});\n" +
               "app.listen(app.get('port'), function() {\n" +
               "console.log('Web app is running on port', app.get('port'));\n"+
               "});\n";
    },
    indexhtml: function () {
        return "<!DOCTYPE html>\n" +
               "<html>\n" + 
               "<head>\n" +
               "<title>web project</title>\n" +
               "</head>\n" +
               "<body>\n" +
               "<p>web project</p>\n" +
               "</body>\n" +
               "</html>\n";
    },
    packages: function () {
        return JSON.stringify({
                  "name": "web",
                  "version": "1.0.0",
                  "description": "",
                  "main": "index.js",
                  "scripts": {
                    "test": "echo \"Error: no test specified\" && exit 1"
                  },
                  "author": "",
                  "license": "ISC",
                  "dependencies": {
                    "express": "^4.13.3"
                  }
              });
    }
}

var file = {
    createDir: function (path) {
        try {
            fs.mkdirSync(path);
            console.log('create path: ' + path);
        }
        catch (e) {
            if ( e.code != 'EEXIST' ) consloe.log('error: '+ e.message);
        }
    },
    writeFile: function (path, fileName, content) {
        var filePath = path + fileName;
        fs.writeFile(filePath, content, function (err) {
            if (err) {
                console.log(err);
            }
            console.log('Write file: ' + filePath);
        });
    }
}

var app = {
    creatProject: function () {
        file.createDir('./css');
        file.createDir('./views');
        file.createDir('./views/partials');
        file.createDir('./views/pages');
        file.createDir('./scripts');
        file.createDir('./images');
        file.writeFile('./', 'index.js', content.indexjs());
        file.writeFile('./views/pages/', 'index.html', content.indexhtml());
        file.writeFile('./', 'package.json', content.packages());
        
        var pInstall, pRun;
        var install = 'npm install';
        var run = 'node index';
        
        pInstall = exec(install, [] , function () {
            pRun = exec(run);
            pRun.stdout.on('data', function(data) {
                console.log('stdout: ' + data);
            });         
            pRun.stderr.on('data', function(data) {
                console.log('stdout: ' + data);
            });
        });
        pInstall.stdout.on('data', function(data) {
            console.log('stdout: ' + data);
        });         
        pInstall.stderr.on('data', function(data) {
            console.log('stdout: ' + data);
        });
    }
};
app.creatProject();
