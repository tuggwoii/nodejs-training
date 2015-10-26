var sql = require('mssql');

var connection = {
    user: 'dt_user',
    password: 'db_password',
    server: 'server_name', // You can use 'localhost\\instance' to connect to named instance 
    database: 'db_name',

    options: {
        encrypt: false // Use this if you're on Windows Azure 
    }
}

exports.connect = function (callback) {
    var response;
    var connect = new sql.Connection(connection, function (err) {
        if (err) {
            response = { isSuccess: false, message: err }
        }
        else {
            response = { isSuccess: true, message: "Connect success" }
        }
        if (callback) {
            callback(response);
        }
    });
}
