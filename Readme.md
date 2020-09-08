Assumptions:
I assumed that input would be sent in one line at a time as if a user was scanning barcodes.
Due to the difficulty in grouping items into books, food, or medicine, I hardcoded the items that were exempt from taxes.

Explanation:
I seperated the code into three functions.
The first function rounds a dollar value to the nearest 5 cents.
The second function is used for displaying the output.
The third function parses the input from the user and converts it into an object that is easy for me to work with.
The last function is used for allowing user input

I have used yarn as my package manager for user input.
Please run yarn install in order to install the required packages.

In order to run the code, please run node SalesTax.js
