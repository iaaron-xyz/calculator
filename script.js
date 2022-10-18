/*************************************************
 * FUNCTIONS
 */

/*
This functions gets executed at the start of the page
to place the buttons at proper size
*/
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
        buttons[i].addEventListener("mouseup", generateSyntaxOperation);
        // Add highlilight when the button is pressed
        buttons[i].addEventListener("mousedown", addHighlight);
        buttons[i].addEventListener("mouseup", removeHighlight);
    }
}

/*
This functions append valid elements into an array
that will contain the elements of the current operation
*/
function generateSyntaxOperation() {
    const currentElement = this.value;
    // Append the first operand (number)
    if (operationPosition == 0 && currentElement in numbers) {
        currentDisplayElements.push(currentElement);
        console.log(currentElement);
        operationPosition++;
    }
    // Keep typing the number in the same position
    else if (operationPosition == 1 && currentElement in numbers) {
        currentDisplayElements[0] += currentElement;
        console.log(currentElement);
    }
    // Go to the next position and add the operator
    else if (operationPosition == 1 && currentElement in operators) {
        currentDisplayElements.push(currentElement);
        operationPosition++;
        console.log(currentElement);
    }
    // Is possible to change the operator before start typing the next operand
    else if (operationPosition == 2 && currentElement in operators) {
        currentDisplayElements[1] = currentElement;
        console.log(currentElement);
    }
    // In the 3rd operand add the next number
    else if (operationPosition == 2 && currentElement in numbers) {
        currentDisplayElements.push(currentElement);
        operationPosition++;
        console.log(currentElement);
    }
    else if (operationPosition == 3 && currentElement in numbers) {
        currentDisplayElements[2] += currentElement;
        console.log(currentElement);
    }
    // After you have the operation stop adding more operators
    else {
        console.log(currentDisplayElements);
        return;
    }
}

/*
If the syntax is in order solve the current operation and set
everything ready for the next
*/
function solveOperation() {
    if (isValidSyntax(currentDisplayElements)) {
        // Create short varialbes for better reading (is it good for performance?)
        const x = Number(currentDisplayElements[0]);
        const operator = currentDisplayElements[1];
        const y = Number(currentDisplayElements[2]);
        let result = 0;
        // Execute the operation
        if (operator == "plus") {
            result = addition(x, y);
        }
        else if (operator == "minus") {
            result = substraction(x, y);
        }
        else if (operator == "multiplication") {
            result = multiplication(x, y);
        }
        else {
            result = division(x, y);
        }
        // When the user types an operator button
        if (this.value in operators) {
            // Use the result as your first operand for the next operation
            operationPosition = 2;
            currentDisplayElements = [result, this.value];
            console.log(`aFTER reasign result ${currentDisplayElements}`);        
            return result;
        }
        // When the user types the equal button
        else if (this.value == "equal"){
            operationPosition = 2;
            currentDisplayElements = [result];
            return result;
        }
        else {
            return;
        }
    }
    return;
}
// Operation solve
function addition(x, y) {
    return x+y;
}
function substraction(x, y) {
    return x-y;
}
function multiplication(x, y) {
    return x*y;
}
function division(x, y) {
    return roundOff(x/y, 5);
}
function roundOff(number, places) {
    const x = Math.pow(10, places);
    return Math.round(number*x)/x;
}

// Validate if the current operation is in correct order to be solved
function isValidSyntax(array) {
    // The array must contain 3 elements: <number> <operator> <number>
    if (array.length == 3) {
        if (Number(array[0]) && Number(array[2]) && array[1] in operators) {
            return true;
        }
    }
    return false;
}

function clear() {
    currentDisplayElements = [];
    operationPosition = 0;
    console.log(currentDisplayElements, operationPosition);
}

// Highlight the button while pressed
function addHighlight() {
    this.classList.add("button-press");
}
function removeHighlight() {
    this.classList.remove("button-press");
}


/**********************************************************
 * DOM MANIPULATION
 */

const buttonsSection = document.getElementById("buttons-section");
const buttons = document.getElementsByTagName("button");
const btnOperators = Array.from(document.getElementsByClassName("button-operator"));
const btnClear = document.getElementById("clear"); 

let operationPosition = 0;
let currentDisplayElements = [];
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


// Place the buttons of the calculator when page loads for the first time
placeButtons();

// Assign to every operator button
btnOperators.forEach(element => {
    element.addEventListener("click", solveOperation);
});

// Add clear listener
btnClear.addEventListener("click", clear);