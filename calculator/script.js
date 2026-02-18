let expression = "";
let memoryValue = 0;

const display = document.querySelector('input');
const subDisplay = document.querySelector('#subDisplay');
const buttons = document.querySelectorAll('.button');
const themeToggle = document.querySelector('#themeToggle');
const clock = document.querySelector('#clock');

function renderDisplay(message = '') {
    display.value = expression;
    if (message) {
        subDisplay.textContent = message;
    }
}

function calculate(value) {
    return Function(`"use strict"; return (${value})`)();
}

function updateClock() {
    clock.textContent = new Date().toLocaleTimeString();
}

function onButtonPress(token) {
    switch (token) {
        case '=':
            if (!expression) {
                return;
            }
            try {
                expression = String(calculate(expression));
                renderDisplay('Calculated');
            } catch {
                expression = '';
                renderDisplay('Invalid expression');
            }
            break;
        case 'C':
            expression = '';
            renderDisplay('Cleared');
            break;
        case '%':
            if (!expression) {
                return;
            }
            try {
                expression = String(calculate(expression) / 100);
                renderDisplay('Converted to percent');
            } catch {
                expression = '';
                renderDisplay('Invalid expression');
            }
            break;
        case 'M+':
            memoryValue += Number(expression || 0);
            renderDisplay(`Saved in memory: ${memoryValue}`);
            break;
        case 'M-':
            memoryValue -= Number(expression || 0);
            renderDisplay(`Memory reduced: ${memoryValue}`);
            break;
        default:
            expression += token;
            renderDisplay();
    }
}

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        const token = e.target.textContent.trim();
        onButtonPress(token);
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowed = '0123456789.+-*/';

    if (allowed.includes(key)) {
        onButtonPress(key);
    } else if (key === 'Enter') {
        onButtonPress('=');
    } else if (key === 'Escape') {
        onButtonPress('C');
    } else if (key === '%') {
        onButtonPress('%');
    }
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    subDisplay.textContent = document.body.classList.contains('light-mode')
        ? 'Light mode'
        : 'Dark mode';
});

updateClock();
setInterval(updateClock, 1000);
renderDisplay('Ready');

// sound function
function sound() {
    const snd = new Audio('click.wav');
    snd.play();
}
