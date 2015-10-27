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
            connect.close();
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
                connect.close();
            });

            request.on('done', function () {
                callback(skills);
                connect.close();
            });
        }
    });
}

function removeSkills (id, callback) {
    var response;
    var isResponse = false;
    var connect = new sql.Connection(connection, function (err) {
        if (err) {
            response = { isSuccess: false, message: err };
            callback(response);
            connect.close();
        }
        else {
            var request = new sql.Request(connect);
            request.stream = true;
            request.query('delete from Skills where PID = ' + id);

            request.on('error', function (err) {
                response = { isSuccess: false, message: err };
                callback(response);
                isResponse = true;
                connect.close();
            });

            request.on('done', function () {
                if (!isResponse) {
                    response = { isSuccess: true, message: 'success' };
                    callback(response);
                    connect.close();
                }
            });
        }
    });
}

function insertSkills (skill, callback) {
    var response;
    var isResponse = false;
    var connect = new sql.Connection(connection, function (err) {
        if (err) {
            response = { isSuccess: false, message: err };
            callback(response);
            connect.close();
        }
        else {
            var request = new sql.Request(connect);
            request.stream = true;
            request.query('INSERT INTO Skills (PID, Skill) VALUES (' + skill.PID + ',\'' + skill.Skill + '\')');

            request.on('error', function (err) {
                response = { isSuccess: false, message: err };
                callback(response);
                isResponse = true;
                connect.close();
            });

            request.on('done', function () {
                if (!isResponse) {
                    response = { isSuccess: true, message: 'success' };
                    callback(response);
                    connect.close();
                }
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
            connect.close();
        }
    });
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
                connect.close();
            });

            request.on('done', function () {
                getSkills(id, function (skills) {
                    if (profiles.length) {
                        profiles[0].skills = skills;
                        callback(profiles[0]);
                        connect.close();
                    }
                    else {
                        response = { isSuccess: false, message: "no records" };
                        callback(response);
                        connect.close();
                    }
                });
            });
        }
    });
};

exports.getSkills = function (id, callback) {
    getSkills(id, callback);
};

exports.saveProfile = function (profile, callback) {
    var response;
    var isResponse = false;
    var connect = new sql.Connection(connection, function (err) {
        if (err) {
            response = { isSuccess: false, message: err };
        }
        else {
            var request = new sql.Request(connect);

            request.stream = true;
            request.query('update Profile set Name = \'' + profile.Name + '\', Email = \'' + profile.Email + '\', Telephone = \'' + profile.Telephone + '\' where Id = ' + profile.Id);

            request.on('error', function (err) {
                response = { isSuccess: false, message: err };
                isResponse = true;
                callback(response);
                connect.close();
            });

            request.on('done', function () {
                if (!isResponse) {
                    removeSkills(profile.Id, function (res) {
                        if (res && res.isSuccess) {
                            for (var i = 0; i < profile.skills.length; i++) {
                                var skill = profile.skills[i];
                                skill.PID = profile.Id;
                                insertSkills(profile.skills[i], function () { });
                            }
                            callback(profile);
                        }
                        else {
                            callback(res);
                        }
                    });
                    connect.close();
                }
            });
        }
    });
};