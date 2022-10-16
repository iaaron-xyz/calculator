const buttonsSection = document.getElementById("buttons-section");
const buttons = document.getElementsByClassName("button");

// This functions gets executed at the start of the page to place the buttons at proper size
function placeButtons() {
    // Get the dimesnions of the buttons section
    buttonsSectionStyle = getComputedStyle(buttonsSection)
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
    }
}

placeButtons();