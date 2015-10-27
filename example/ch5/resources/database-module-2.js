'use strict';
var sql = require('mssql');

var connection = {
    user: 'tugg',
    password: 'tugg2015',
    server: 'TUGG-DESKTOP\\SQLSERVER', // You can use 'localhost\\instance' to connect to named instance
    database: 'node',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

function getSkills (id, callback) {
    var response;
    var connect = new sql.Connection(connection, function (err) {
        if (err) {
            response = { isSuccess: false, message: err };
            callback(response);
        }
        else {
            var request = new sql.Request(connect);
            var skills = [];
            request.stream = true;
            request.query('select * from Skills where PID = ' + id);

            //request.on('recordset', function (columns) {

            //});

            request.on('row', function (row) {
                skills.push(row);
            });

            request.on('error', function (err) {
                response = { isSuccess: false, message: err };
                callback(response);
            });

            request.on('done', function () {
                callback(skills);
            });
        }
    });
}

exports.connect = function (callback) {
    var response;
    var connect = new sql.Connection(connection, function (err) {
        if (err) {
            response = { isSuccess: false, message: err };
        }
        else {
            response = { isSuccess: true, message: "Connect success" };
        }
        if (callback) {
            callback(response);
        }
    });
    return connect;
};

exports.getProfile = function (id, callback) {
    var response;
    var connect = new sql.Connection(connection, function (err) {
        if (err) {
            response = { isSuccess: false, message: err };
        }
        else {
            var request = new sql.Request(connect);
            var profiles = [];
            request.stream = true;
            request.query('select * from Profile where Id = ' + id);

            //request.on('recordset', function (columns) {

            //});

            request.on('row', function (row) {
                profiles.push(row);
            });

            request.on('error', function (err) {
                response = { isSuccess: false, message: err };
                callback(response);
            });

            request.on('done', function () {
                getSkills(id, function (skills) {
                    if (profiles.length) {
                        profiles[0].skills = skills;
                        callback(profiles[0]);
                    }
                    else {
                        response = { isSuccess: false, message: "no records" };
                        callback(response);
                    }
                });
            });
        }
    });
    return connect;
};

exports.getSkills = function (id, callback) {
    getSkills(id, callback);
};
