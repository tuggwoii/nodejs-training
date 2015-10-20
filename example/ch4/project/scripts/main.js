'use strict';

//Function
function calc (a, b) {
	return a + b;
}

function loging (content) {
	/*eslint-disable */
	console.log(content);
	/*eslint-enable */
}

//Array
var myArray = [
	{ id: 1, name: 'Tak'},	//object
	1,						//int
	'string'				//string
];
loging('array result: ' + myArray);


var calcResult = calc(1, 2);
loging('caculate result: ' + calcResult);

//Object
var personObject = {
	name: 'Tak',
	email: 'syamkong@manaosoftware.com',
	setName: function (name) {
		this.name = name;
	}
};
loging(personObject);
loging(personObject.name);
personObject.setName('Someone else');
loging(personObject.name);

//Class
function Person (name, email) {
	//encapsulate will go here
	this.name = name;
	this.email = email;
	this.setName = function (name) {
		this.name = name;
	};
}

var personClass = new Person('Tak', 'syamkong@manaosoftware.com');
loging(personClass);
loging(personClass.name);
personClass.setName('Someone else');
loging(personClass.name);
