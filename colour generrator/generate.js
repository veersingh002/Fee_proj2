// Select all color elements and value elements
const colorElements = document.querySelectorAll('.color');
const valueElements = document.querySelectorAll('.value');

// Function to copy text to clipboard
function copyToClipboard(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

// Add event listener to each copy button inside color elements
colorElements.forEach((colorElement, index) => {
    const copyButton = colorElement.querySelector('.copy-btn'); // Get the copy button inside current color element
    const hexValue = valueElements[index].textContent; // Get the hex value from corresponding value element

    // Add click event listener to the copy button
    copyButton.addEventListener('click', () => {
        copyToClipboard(hexValue); // Copy hex value to clipboard
        copyButton.textContent = 'Copied!'; // Update button text to indicate successful copy
        setTimeout(() => {
            copyButton.textContent = 'Copy'; // Reset button text after 1.5 seconds
        }, 1500);
    });
});

// Function to generate random hue, saturation, and lightness values
function randomH() {
    return Math.floor(Math.random() * 360);
}

function randomS() {
    return Math.floor((Math.random() * 81) + 10);
}

function randomL() {
    return Math.floor((Math.random() * 81) + 10);
}

// Function to convert RGB color to hexadecimal color
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

// Function to generate shades and update color and value elements
function generateShades() {
    colorElements.forEach((colorElement, index) => {
        let randomHue = randomH();
        let randomSat = randomS();
        let randomLight = randomL();

        function correctiveHue(x) {
            if ((randomHue + x) > 360) {
                return (randomHue + x) - 360;
            } else {
                return (randomHue + x);
            }
        }

        function correctiveSat(x) {
            if ((randomSat + x) > 100) {
                return (randomSat - x);
            } else {
                return (randomSat + x);
            }
        }

        function correctiveLight(x) {
            if ((randomLight + x) > 100) {
                return (randomLight - x);
            } else {
                return (randomLight + x);
            }
        }

        // Set background color of the color element
        colorElement.style.backgroundColor = `hsl(${randomHue}, ${randomSat}%, ${randomLight}%)`;

        // Set inner HTML of the corresponding value element to hexadecimal color code
        valueElements[index].textContent = rgb2hex(colorElement.style.backgroundColor);
    });
}

// Call generateShades initially and on button click
generateShades();

const btn = document.querySelector('button');
btn.addEventListener('click', () => {
    generateShades();
});

// Menu animation
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('ul');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
});
