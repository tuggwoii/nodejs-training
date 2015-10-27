'use strict';
var db = require('./database-module.js');

exports.response = function (routes, data, callback) {
    if (routes[1] == 'connection') {
        db.connect(callback);
    }
    else if (routes[1] == 'getprofile') {
        var id;
        if (routes[2]) {
            try {
                id = parseInt(routes[2]);
            }
            catch (e) {
                id = 0;
            }
            if (id) {
                db.getProfile(id, callback);
            }
            else {
                callback({ isSuccess: false, message: 'invalid id'});
            }
        }
        else {
            callback({ isSuccess: false, message: 'id not found' });
        }
    }
    else if (routes[1] == 'saveprofile') {
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
    else {
        callback({ isSuccess: false, message: 'request not found' });
    }
};

