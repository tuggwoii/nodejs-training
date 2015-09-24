var sys = require("sys");
var math = require("./calc.js");
var stdin = process.openStdin();
var mode;
var nums = []; 

menuScreen();

stdin.addListener("data", function(d) {
    
    var input = d.toString().trim();
    
    if(mode === 0) {
        menuScreenInput(input);
    }
    else if(mode === 1) {
        receiveInput(input);
    }
    else if(mode === 2) {
        receiveInput(input);
    }
    
});

function menuScreen () {
    mode = 0;
    console.log('Math menu screen');
    console.log('put 1  = add');
    console.log('put 2 = subtract');
    console.log('put 3 = exit');
}

function waitingInput() {   
    console.log('Type number to input the '+ (nums.length === 0?'first':'second') +' number:');
    console.log('Type b to back');
}


function menuScreenInput (input) { 
    if(input === '1') {
       mode = 1;
       waitingInput();
    }
    else if(input === '2') {
       mode = 2;
       waitingInput();
    }
    else if(input === '3') {
        console.log('bye');
        process.exit(0);
    }
    else {
        console.log('don\'t be stupid! I told you what you can input at the begining!');
    }
}

function receiveInput (input) {
    if(input === 'b') {
        nums = [];
        menuScreen();
    }
    else {
        var num = parseInt(input);
        if(!isNaN(num)) {
            nums.push(num);
        }
        if(nums.length === 2) {
            doOperation(nums[0], nums[1]);
        }
        else {
            waitingInput();
        }       
    }
}

function doOperation(a, b) {
    var result;
    if(mode === 1) {
        result = math.plus(a, b);
    }
    else if(mode === 2) {
        result = math.minus(a, b);
    }
    
    console.log('result is: ' + result);
    
    setTimeout(function () {
        console.log('bye');
        process.exit(0);
    }, 2000);
}