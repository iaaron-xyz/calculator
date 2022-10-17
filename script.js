const buttonsSection = document.getElementById("buttons-section");
const buttons = document.getElementsByTagName("button");

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

// This functions gets executed at the start of the page to place the buttons at proper size
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

function generateSyntaxOperation() {
    /*
    This functions append valid elements into an array
    that will contain the elements of the current operation
    */
    
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
    else {
        console.log(currentDisplayElements);
        return;
    }
}
function solveOperation(operationArguments) {
    return 0;
}
function validSyntaxOperation(array) {
    if (Number(array[0]) && Number(array[2]) && array[2] in operators) {
        return true;
    }
    return false;
}
// Highlight the button while pressed
function addHighlight() {
    this.classList.add("button-press");
}
function removeHighlight() {
    this.classList.remove("button-press");
}


// Place the buttons of the calculator when page loads for the first time
placeButtons();