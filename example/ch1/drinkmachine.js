
var sys = require("sys");
var stdin = process.openStdin();
var mode;
var total = 0;
var drink;
stdin.addListener("data", function (d) {

    var input = d.toString().trim();

    if (mode === 0 || mode === 5 || mode === 10) {
        receiveInput(input);
    }

    //else {
    //    console.log('Type b to back');
    //    receiveInput(input);
    //}

});

function menuScreen() {
    mode = 0;
    console.log('Insert coin');
    console.log('put 1');
    console.log('put 5');
    console.log('put 10');
}
function drinkOption() {
    drink = 0;
    console.log('Coke? 10:');
    console.log('Sprite? 15:');
    console.log('Fanta? 18:');
}

function receiveInput(input) {
    if (input === 'b') {
        nums = [];
        menuScreen();
    }
        //else {
        //    var num = parseInt(input);
        //    if (!isNaN(num)) {
        //        nums.push(num);
        //    }
        //    if (nums.length === 2) {
        //        doOperation(nums[0], nums[1]);
        //    }
        //    else {
        //        waitingInput();
        //    }
        //}
    else {
        var num = parseInt(input);
        if (!isNaN(num)) {
            total += num;
            console.log("total: ", total);
            if (total >= 10) {

            }
        }
    }
}
function process() {
}
function chooseProduct(coin)
{
    drinkOption();
    if(coin>=10)
    {

        total = total - coin;
    }
    if(coin>=15)
    {

    }
    if (coin >= 18) {
    }
}
menuScreen();