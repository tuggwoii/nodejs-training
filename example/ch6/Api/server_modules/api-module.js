'use strict';
var ps = require('./persons-module.js');
exports.response = function (routes, method, data, callback) {
    if (routes[1] == 'persons') {
        ps.recieveRequest(routes, method, data, callback);
    }
    else {
        callback({ isSuccess: false, message: 'resource not found' });
    }
};

