describe("test main.js", function () {
    
	//TEST FUNCTION
	it("function calc", function () {
        expect(calc).toBeDefined();
		expect(calc(1, 2)).toEqual(3);
		expect(calc(100, 9000)).toEqual(9100);
		expect(calc(0, -1)).toEqual(-1);
    });
	
	it("function loging", function () {
        expect(loging).toBeDefined();
    });
	
	//TEST VARIABLE
	it("variable myArray", function () {
        expect(myArray).toBeDefined();
		expect(myArray.length).toEqual(3);
		expect(myArray[0].id).toEqual(1);
		expect(myArray[0].name).toEqual('Tak');
		expect(myArray[1]).toEqual(1);
		expect(myArray[2]).toEqual('string');
    });
	
	//TEST CLASS
	var person = new Person('test', 'test@test');
	it("class Person", function () {
        expect(person.name).toEqual('test');
		expect(person.email).toEqual('test@test');
    });
});