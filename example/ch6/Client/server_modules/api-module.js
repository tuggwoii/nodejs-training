'use strict';
var db = require('./database-module.js');

function notFound () {
    return { isSuccess: false, message: 'request not found' };
}

function getProfile(id, callback) {
    if (id) {
        try {
            id = parseInt(id);
        }
        catch (e) {
            id = 0;
        }
        if (id) {
            db.getProfile(id, callback);
        }
        else {
            callback({ isSuccess: false, message: 'invalid id' });
        }
    }
    else {
        callback({ isSuccess: false, message: 'id not found' });
    }
}

function saveProfile(data, callback) {
    if (data) {
        if (data.Id) {
            db.saveProfile(data, callback);
        }
        else {
            callback({ isSuccess: false, message: 'invalid id' });
        }
    }
    else {
        callback({ isSuccess: false, message: 'id not found' });
    }
}

exports.response = function (routes, data, callback) {
    if (routes[1] == 'connection') {
        db.connect(callback);
    }
    else if (routes[1] == 'getprofile') {
        getProfile(routes[2], callback);
    }
    else if (routes[1] == 'saveprofile') {
        saveProfile(data, callback);
    }
    else {
        callback(notFound());
    }
};

