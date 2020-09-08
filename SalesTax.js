"use strict";
exports.__esModule = true;
var readline = require("readline");
/**
 * takes a dollar value and rounds up to the nearest 5 cents
 * @param val
 */
var rounded = function (val) {
    var multiple = val * 10;
    if (multiple % 1 > 0.2 && multiple % 1 <= 0.5) {
        multiple = multiple - (multiple % 1);
        return Math.round(multiple) / 10 + 0.05;
    }
    return Math.round(multiple) / 10;
};
/**
 * Creates an output for display from the receipt
 * @param receipt
 */
var printReceipt = function (receipt) {
    var total = 0.0;
    var output = '';
    var salesTax = 0.0;
    for (var key in receipt) {
        total += receipt[key].price * receipt[key].count;
        output += key + ": " + receipt[key].price * receipt[key].count + " ";
        salesTax += receipt[key].salesTax;
        if (receipt[key].count > 1) {
            output += "(" + receipt[key].count + "  @ " + receipt[key].price + ")\n";
        }
        else {
            output += ' \n';
        }
    }
    output += "Sales Taxes: " + salesTax + " \n";
    output += "Total: " + total + " \n";
    return output;
};
/**
 * Takes input one line at a time
 * converts to a receipt object
 * @param input
 */
var parseInput = function (input, receipt) {
    var arr = input.split(' ');
    var key = "" + arr[1];
    var i = 2;
    var salesTax = 10.0;
    while (arr[i] !== 'at') {
        key += " " + arr[i];
        i++;
    }
    if (key.includes('Imported')) {
        salesTax += 5;
    }
    if (key.includes('Book') ||
        key.includes('Chocolate') ||
        key.includes('chocolate') ||
        key.includes('pills')) {
        salesTax -= 10;
    }
    salesTax /= 100;
    var count = parseInt(arr[0]);
    var price = parseFloat(arr[i + 1]);
    salesTax = price * salesTax;
    salesTax = rounded(salesTax);
    price += salesTax;
    price = parseFloat(price.toFixed(2));
    if (receipt[key]) {
        receipt[key].count += count;
    }
    else {
        receipt[key] = { count: count, price: price, salesTax: salesTax };
    }
    return;
};
/**
 * takes in user input using readline
 */
var userInput = function () {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Input in a item in the following format: \n count itemname at price: ', function (input) {
        receipt = {};
        parseInput(input, receipt);
        rl.question('Are you finished? if so submit 0. Otherwise hit enter', function (end) {
            rl.close();
            if (end === '0') {
                output = printReceipt(receipt);
                console.log(output);
                process.exit(0);
            }
            else {
                userInput();
            }
        });
    });
};
var receipt = {};
parseInput('1 Book at 12.49', receipt);
parseInput('1 Book at 12.49', receipt);
parseInput('1 Music CD at 14.99', receipt);
parseInput('1 Chocolate Bar at 0.85', receipt);
var output = printReceipt(receipt);
console.log(output);
console.log('----------------------------------------');
receipt = {};
parseInput('1 Imported box of chocolates at 10.00', receipt);
parseInput('1 Imported bottle of perfume at 47.50', receipt);
output = printReceipt(receipt);
console.log(output);
console.log('----------------------------------------');
receipt = {};
parseInput('1 Imported bottle of perfume at 27.99', receipt);
parseInput('1 Bottle of perfume at 18.99', receipt);
parseInput('1 Packet of headache pills at 9.75', receipt);
parseInput('1 Imported box of chocolates at 11.25', receipt);
parseInput('1 Imported box of chocolates at 11.25', receipt);
output = printReceipt(receipt);
console.log(output);
userInput();
