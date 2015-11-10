'use strict';
var fs = require('fs');

function saveProfile(profile, callback) {
    var path = 'resources/profile.json';
    fs.writeFile(path, JSON.stringify(profile), function (err) {
        if (err) {
            callback({ isSuccess: false, message: err });
        }
        else {
            callback({ isSuccess: true, message: "success" });
        }
    });
}

exports.connect = function (callback) {
    callback({ isSuccess: true, message: "success" });
};

exports.getProfile = function (id, callback) {
    fs.readFile('resources/profile.json', 'utf8', function (err, data) {
        if (err) {
            callback({ isSuccess: false, message: err });
        }
        else {
            var profile = JSON.parse(data);
            callback(profile);
        }
    });
};

exports.saveProfile = function (profile, callback) {
    saveProfile(profile, callback);
};