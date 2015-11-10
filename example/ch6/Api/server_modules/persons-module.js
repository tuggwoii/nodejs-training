'use strict';
var fs = require('fs');
var resourceUrl = 'resources/persons.json';

function savePersons(data, callback) {
    fs.writeFile(resourceUrl, JSON.stringify(data), function (err) {
        if (err) {
            callback({ isSuccess: false, message: err });
        }
        else {
            callback({ isSuccess: true, message: "success" });
        }
    });
}

function getPersons (callback) {
    fs.readFile(resourceUrl, 'utf8', function (err, data) {
        if (err) {
            callback({ isSuccess: false, message: err });
        }
        else {
            var persons = JSON.parse(data);
            callback(persons);
        }
    });
};

function getPerson(id, callback) {
    fs.readFile(resourceUrl, 'utf8', function (err, data) {
        if (err) {
            callback({ isSuccess: false, message: err });
        }
        else {
            var persons = JSON.parse(data);
            var response = { isSuccess: false, message: "resource not found" };
            persons.filter(function (person) {
                if (person.id == id) {
                    response = person;
                    console.log("here");
                }
            });
            callback(response);
        }
    });
};

function addPersons(data ,callback) {
    if (data.name && data.email) {
        getPersons(function (getResponse) {
            if (getResponse.isSuccess !== false) {
                var persons = [];
                if (getResponse.length) {
                    persons = getResponse;
                    data.id = persons[persons.length - 1].id + 1;
                }
                else {
                    data.id = 1;
                }
                persons.push(data);
                savePersons(persons, function (saveResponse) {
                    if (saveResponse !== false) {
                        callback(data);
                    }
                    else {
                        callback(saveResponse);
                    }
                });
            }
            else {
                callback(getResponse);
            }
        });
    }
    else {
        callback({ isSuccess: false, message: "invalid person data", status: 400 });
    }
};

function updatePersons(id, data, callback) {
    if (data.name && data.email && id == data.id) {
        getPersons(function (getResponse) {
            if (getResponse.isSuccess !== false) {
                var isExist = false;
                if (getResponse.length) {
                    var persons = getResponse;
                    persons.filter(function (person) {
                        if (person.id === data.id) {
                            isExist = true;
                            person.name = data.name;
                            person.email = data.email
                        }
                    });
                }
                if (isExist) {
                    savePersons(persons, function (saveResponse) {
                        if (saveResponse !== false) {
                            callback(data);
                        }
                        else {
                            callback(saveResponse);
                        }
                    });
                }
                else {
                    callback({ isSuccess: false, message: "resource not found"});
                }
            }
            else {
                callback(getResponse);
            }
        });
    }
    else {
        callback({ isSuccess: false, message: "invalid person data", status: 400 });
    }
};

function deletePersons(id, data, callback) {
    if (data.name && data.email && id == data.id) {
        getPersons(function (getResponse) {
            if (getResponse.isSuccess !== false) {
                if (getResponse.length) {
                    var persons = getResponse;
                    var index = -1;
                    var count = 0;
                    persons.filter(function (person) {
                        if (person.id === data.id) {
                            index = count;
                        }
                        count++;
                    });
                }
                if (index > -1) {
                    persons.splice(index, 1);
                    savePersons(persons, function (saveResponse) {
                        if (saveResponse !== false) {
                            callback(data);
                        }
                        else {
                            callback(saveResponse);
                        }
                    });
                }
                else {
                    callback({ isSuccess: false, message: "resource not found" });
                }
            }
            else {
                callback(getResponse);
            }
        });
    }
    else {
        callback({ isSuccess: false, message: "invalid person data", status: 400 });
    }
};

exports.recieveRequest = function (routes, method, data, callback) {
    if ((!routes[2] || routes[2] === '') && method.toLowerCase() === 'get') {
        console.log('Request get persons');
        getPersons(callback);
    }
    else if (routes[2] && method.toLowerCase() === 'get') {
        console.log('Request get person by id: ' + routes[2]);
        getPerson(routes[2], callback);
    }
    else if ((!routes[2] || routes[2] === '') && method.toLowerCase() === 'post') {
        console.log('Request post persons: ', data);
        addPersons(data, callback);
    }
    else if (routes[2] && method.toLowerCase() === 'put') {
        console.log('Request put persons: ', data);
        updatePersons(routes[2], data, callback);
    }
    else if (routes[2] && method.toLowerCase() === 'delete') {
        console.log('Request delete persons: ', data);
        deletePersons(routes[2], data, callback);
    }
    else {
        callback({ isSuccess: false, message: "resource not found" });
    }
}