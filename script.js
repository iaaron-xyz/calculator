/*************************************************
 * FUNCTIONS
 */
/**
 * Functions That Get Executed When The Page Loads
 */
// This functions gets executed at the start of the page
// to place the buttons at proper size
function placeButtons() {
    // Get the dimesnions of the buttons section
    const buttonsSectionStyle = getComputedStyle(buttonsSection)
    const totalHeight = parseInt(buttonsSectionStyle.height);
    const totalWidth = parseInt(buttonsSectionStyle.width);
    // Set the number of rows and columns for the buttons
    const buttonCols = 4;
    const buttonRows = 5;
    // Get the number of elements with given classes
    const listButtons = buttons.length;
    // Assign a same height and width to square buttons
    for (let i = 0; i < listButtons; i++) {
        buttons[i].style.cssText = `width: ${totalWidth/buttonCols}px; height: ${totalHeight/buttonRows}px;`;
        buttons[i].addEventListener("mousedown", generateSyntaxOperation);
        // Add highlilight when the button is pressed
        buttons[i].addEventListener("mousedown", addHighlight);
        buttons[i].addEventListener("mouseup", removeHighlight);
    }
}


/**
 * Functions that get called by an event 
 */
//This functions append valid elements into an array
//that will contain the elements of the current operation
function generateSyntaxOperation() {
    const currentElement = this.value;

    // GOOD CASES
    // Append the first operand (number)
    if (operationPosition == 0 && (currentElement in numbers || currentElement == "dot")) {
        // Add decimal point
        if (currentElement == "dot") {
            currentOperationElmnts.push("0.");
        }
        // Add a digit
        else {
            currentOperationElmnts.push(currentElement);
        }
        operationPosition++; // 1
        console.log(currentElement);
    }
    // For numbers with more than 1 digit
    else if (operationPosition == 1 && (currentElement in numbers || currentElement == "dot")) {
        // Add a decimal point
        if (currentElement == "dot" && !currentOperationElmnts[0].match(/\./gi)) {
            currentOperationElmnts[0] += "."
        }
        // Add a digit
        else if (currentElement != "dot") {
            currentOperationElmnts[0] += currentElement;
        }
        console.log(currentElement);
    }

    // Go to the next position and add the operator
    else if (operationPosition == 1 && currentElement in operators) {
        currentOperationElmnts.push(currentElement);
        operationPosition++; // 2
        console.log(currentElement);
    }
    // Is possible to change the operator before start typing the next operand
    else if (operationPosition == 2 && currentElement in operators) {
        currentOperationElmnts[1] = currentElement;
        console.log(currentElement);
    }

    // Start a new operation if after the result the user types a number
    else if (operationPosition == 2 && (currentElement in numbers || currentElement == "dot") && currentOperationElmnts.length == 1) {
        clear();
        // Add decimal point
        if (currentElement == "dot") {
            currentOperationElmnts.push("0.");
        }
        // Add a digit
        else if (currentOperationElmnts){
            currentOperationElmnts.push(currentElement);
        }
        operationPosition++; // 3
        console.log(currentElement);
    }

    // Continue with the previous result if the user types a symbol
    else if (operationPosition == 2 && (currentElement in numbers || currentElement == "dot")) {
        // Add decimal point
        if (currentElement == "dot") {
            currentOperationElmnts.push("0.");
        }
        // Add a digit
        else if (currentOperationElmnts){
            currentOperationElmnts.push(currentElement);
        }
        operationPosition++; // 3
        console.log(currentElement);
    }
    else if (operationPosition == 3 && (currentElement in numbers || currentElement == "dot")) {
        // Add a decimal point
        if (currentElement == "dot" && !currentOperationElmnts[2].match(/\./gi)) {
            currentOperationElmnts[2] += "."
        }
        // Add a digit
        else if (currentElement != "dot") {
            currentOperationElmnts[2] += currentElement;
        }
        console.log(currentElement);
    }

    // Avoid unnecessary digits repetitions, like multiple zeros
    for (let i = 0; i < currentOperationElmnts.length; i+=2) {
        if (currentElement == "dot" || currentOperationElmnts[i].match(/\./gi)) {
            currentOperationElmnts[i] = currentOperationElmnts[i].toString();
        }
        else {
            currentOperationElmnts[i] = Number(currentOperationElmnts[i]).toString();
        }
    }
    console.log(currentOperationElmnts);
}

// This functions gets called everytime an operator is clicked
function solveOperation() {
    if (isValidSyntax(currentOperationElmnts)) {
        // Create short varialbes for better reading (is it good for performance?)
        const x = Number(currentOperationElmnts[0]);
        const operator = currentOperationElmnts[1];
        const y = Number(currentOperationElmnts[2]);
        // Execute the operation
        if (operator == "plus") {
            currentResult = addition(x, y);
        }
        else if (operator == "minus") {
            currentResult = substraction(x, y);
        }
        else if (operator == "multiplication") {
            currentResult = multiplication(x, y);
        }
        else {
            currentResult = division(x, y);
        }
        // When the user types an operator button
        if (this.value in operators) {
            // Use the currentResult as your first operand for the next operation
            operationPosition = 2;
            currentOperationElmnts = [currentResult, this.value];
            console.log(`aFTER reasign currentResult ${currentOperationElmnts}`);
        }
        // When the user types the equal button
        else if (this.value == "equal"){
            operationPosition = 2;
            currentOperationElmnts = [currentResult];
        }
        // Reset minus sign counter depending on the result value
        minusSign[0] = currentResult >= 0 ? 0 : 1;
        minusSign[1] = 0;
    }
    return;
}

// Function called by the Clear button
function clear() {
    // Reset the variables
    currentOperationElmnts = [];
    operationPosition = 0;
    currentResult = "None";
    // Console test messages
    console.log(currentOperationElmnts, operationPosition);
    // Clear the display calculator
    screenOperation.innerHTML = '';
    screenResult.innerHTML = '';
}

function deleteChar() {
    // For the first operand
    if (currentOperationElmnts.length == 1) {
        if (currentOperationElmnts[0].length > 1) {
            currentOperationElmnts[0] = currentOperationElmnts[0].toString().slice(0, -1);
        }
        else {
            currentOperationElmnts = [];
            operationPosition = 0;
        }
    }
    // For the operator
    else if (currentOperationElmnts.length == 2) {
        currentOperationElmnts.pop();
        operationPosition = 1;
    }
    // For the secodn operand
    else if (currentOperationElmnts.length == 3) {
        if (currentOperationElmnts[2].length > 1) {
            currentOperationElmnts[2] = currentOperationElmnts[2].toString().slice(0, -1);
        }
        else {
            currentOperationElmnts.pop();
            operationPosition = 2;
        }
    }
    console.log(currentOperationElmnts);
    displayOperation();
}

// Function called by the percent button
function getInPercent() {
    // Just apply percent to the last number operand
    if (currentOperationElmnts.length == 3) {
        currentOperationElmnts[2] = division(Number(currentOperationElmnts[2]), 100);
        displayOperation();
    }
}

// This function gets called by the plus-minus button
// Toggle the minus sign to the current number
function addPlusMinus() {
    // Toggle the minus sign to the first number
    if (currentOperationElmnts.length == 1 || currentOperationElmnts.length == 2) {
        if (minusSign[0]%2 == 0) {
            currentOperationElmnts[0] = "-" + currentOperationElmnts[0].toString().replace(/-/g, "");
        }
        else {
            currentOperationElmnts[0] = currentOperationElmnts[0].toString().replace(/-/g,"");
        }
        minusSign[0]++;
    }
    else if (currentOperationElmnts.length == 3) {
        if (minusSign[1]%2 == 0) {
            currentOperationElmnts[2] = "-" + currentOperationElmnts[2].toString().replace(/-/g, "");
        }
        else {
            currentOperationElmnts[2] = currentOperationElmnts[2].toString().replace(/-/g,"");
        }
        minusSign[1]++;
    }
    displayOperation();
    console.log(minusSign);
}

// Display on screen the decimal point number
function DisplayDecimal() {
    displayOperation();
}

// This function gets called by number and operator buttons
function displayOperation() {
    if (currentOperationElmnts.length == 1) {
        screenOperation.innerHTML = currentOperationElmnts[0];
    }
    else if (currentOperationElmnts.length == 2) {
        screenOperation.innerHTML = currentOperationElmnts[0] + 
                                    operatorToHTML(currentOperationElmnts[1]);
    }
    else if (currentOperationElmnts.length == 3) {
        screenOperation.innerHTML = currentOperationElmnts[0] + 
                                    operatorToHTML(currentOperationElmnts[1]) + 
                                    currentOperationElmnts[2] + 
                                    '<span class="operator">=</span>';
    }
    else {
        screenOperation.innerHTML = "";
    }
    console.log(currentOperationElmnts);
}

// This function gets called by any button
// Displays the result on screen-result section
function displayResult() {
    if (currentResult == "None") {
        screenResult.innerHTML = '';
    }
    else {
        screenResult.innerHTML = currentResult;
    }
}

// Highlight the button while pressed
function addHighlight() {
    this.classList.add("button-press");
}
function removeHighlight() {
    this.classList.remove("button-press");
}

/**
 * Auxiliar functions
 */
// Validate if the current operation is in correct order to be solved
function isValidSyntax(array) {
    // The array must contain 3 elements: <number> <operator> <number>
    if (array.length == 3) {
        if ((Number(array[0]) || Number(array[0]) == 0) && (Number(array[2]) || Number(array[2]) == 0) && array[1] in operators) {
            return true;
        }
    }
    return false;
}

function operatorToHTML(string) {
    if (string == "plus") {
        return '<span class="operator">+</span>';
    }
    if (string == "minus") {
        return '<span class="operator">-</span>';
    }
    if (string == "multiplication") {
        return '<span class="operator">&#215;</span>';
    }
    if (string == "division") {
        return '<span class="operator">&#247;</span>';
    }
}

function addition(x, y) {
    return roundOff(x+y, 5);
}
function substraction(x, y) {
    return roundOff(x-y, 5);
}
function multiplication(x, y) {
    return roundOff(x*y, 5);
}
function division(x, y) {
    return roundOff(x/y, 5);
}
function roundOff(number, places) {
    const x = Math.pow(10, places);
    return Math.round(number*x)/x;
}


/**********************************************************
 * DOM MANIPULATION
 */

// DOM elements
const buttonsSection = document.getElementById("buttons-section");
const buttons = document.getElementsByTagName("button");
const btnOperators = document.getElementsByClassName("button-operator");
const btnClear = document.getElementById("clear");
const btnDelete = document.getElementById("delete");
const btnEqual = document.getElementById("equal");
const btnPercent = document.getElementById("percent");
const btnPlusMinus = document.getElementById("plus-minus");
const btnDot = document.getElementById("dot");
const screenOperation = document.querySelector(".screen-operation");
const screenResult = document.querySelector(".screen-result");

// Variables
const year = new Date().getFullYear();
let operationPosition = 0;
let currentResult = "None";
let minusSign = [0, 0];
// let decimalPoint = [false, false];
let currentOperationElmnts = [];
// Objects
const numbers = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "0": 0
}
const operators = {
    plus: "plus",
    minus: "minus",
    multiplication: "multiplication",
    division: "division"
}

/** 
 * DOM Interactivity
*/

// Place the buttons of the calculator when page loads for the first time
placeButtons();
// Add curretn year on the footer
document.getElementById("year").innerHTML = year;

// Add listener to equal button
for (let i = 0; i < btnOperators.length; i++) {
    btnOperators[i].addEventListener("mouseup", solveOperation);
}
// Show in the calculator screen the sybols typed
for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].value in numbers || buttons[i].value in operators) {
        buttons[i].addEventListener("click", displayOperation);
        buttons[i].addEventListener("click", displayResult);
    }
}

// Show result on screen
btnEqual.addEventListener("click", displayResult);
// Add clear listener
btnClear.addEventListener("click", clear);
// Delete the last character of the operation
btnDelete.addEventListener("click", deleteChar);
// Percentage
btnPercent.addEventListener("click", getInPercent);
// Plus-minus
btnPlusMinus.addEventListener("click", addPlusMinus);
// Put a decilmal points
btnDot.addEventListener("click", DisplayDecimal);