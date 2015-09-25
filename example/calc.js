//var exports = module.exports = {}

exports.plus = function (a, b) {
    return a + b;
}

exports.minus = function (a, b) {
    return a - b;
}

module.exports.multiply = function (a, b) {
    return a * b;
}

module.exports.divide = function (a, b) {
    return doDivide(a, b);
}

function doDivide(a, b) {
    return a / b
}

//exports = 'destroy';
//module.exports = 'destroy';