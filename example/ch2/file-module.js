
var fs = require('fs');

function writeFile (fileName, content) {
    var path = 'resources/' + fileName;
    fs.writeFile(path, content, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Write file ' +
            fileName + ' success!');
    });
}

exports.writeJSON = function (fileName, obj) {
    try {
        if(fileName && obj) {
            var fileName = fileName + '.json';
            var content = JSON.stringify(obj);
            writeFile(fileName, content);
        }
        else {
             console.log('write file cancelled')
        }
    }
    catch(e) {
        console.log('write file error: ' + e.message);
    }
}