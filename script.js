const buttonsSection = document.getElementById("buttons-section");
const buttons = document.getElementsByTagName("button");

counter = 0;
let currentDisplayVals = [];
let numbers = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "zero": 0,
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
        buttons[i].addEventListener("mouseup", syntaxOperation);
        // Add highlilight when the button is pressed
        buttons[i].addEventListener("mousedown", addHighlight);
        buttons[i].addEventListener("mouseup", removeHighlight);
    }
}

function syntaxOperation() {
    currentDisplayVals.push(this.value);
    console.log(currentDisplayVals);
}
function addHighlight() {
    this.classList.add("button-press");
}
function removeHighlight() {
    this.classList.remove("button-press");
    console.log(numbers);
}

placeButtons();