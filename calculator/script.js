let display = document.getElementById('display');
let calculator = document.querySelector('.calculator');
let prevResult = ''; // Variable to store the result of the previous calculation

function appendToDisplay(value) {
    const lastChar = display.value[display.value.length - 1];

    // Check if the value is an operator and it is entered after another operator or at the beginning
    const operators = ['+', '-', '*', '/', '%'];
    if (operators.includes(value) && (operators.includes(lastChar) || display.value === '')) {
        return; // Does not add the operator if it is redundant or at the beginning
    }

    if (value === 'sqrt') {
        // Check if the sqrt operator is entered after another operator or at the beginning
        if (operators.includes(lastChar) || display.value === '') {
            return; // Do not add sqrt if it is redundant or at the beginning
        }
        value = 'Math.sqrt'; //   to use eval() for calculation
    }

    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value.replace(/sqrt/g, 'Math.sqrt');
        prevResult = eval(expression); // Store the result in the prevResult variable
        display.value = prevResult;
    } catch (error) {
        display.value = 'Error';
        calculator.classList.add('error'); //  error class to change the background color when there's an error.
    }
}



function toggleSign() {
    // Toggle the sign of the last number entered
    const lastCharIndex = display.value.length - 1;
    if (lastCharIndex >= 0 && !isNaN(display.value[lastCharIndex])) {
        let newValue = '';
        let i = lastCharIndex;
        while (i >= 0 && (display.value[i] === '.' || !isNaN(display.value[i]))) {
            newValue = display.value[i] + newValue;
            i--;
        }
        newValue = newValue.includes('.') ? -parseFloat(newValue) : -parseInt(newValue);
        display.value = display.value.slice(0, i + 1) + newValue + display.value.slice(lastCharIndex + 1);
    }
}

function getAnswer() {
    // Append the previous result to the display when "Ans" button is clicked
    appendToDisplay(prevResult.toString());
}


document.addEventListener('keydown', function (event) {
  const key = event.key;
  const validInputs = /[0-9+\-*/().]|Enter|Backspace|%/; // Added Backspace key to validInputs

  // Allow operator keys from the numeric keypad
  if (/^[+\-*/%]$/.test(key) && event.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
      event.preventDefault();
      appendToDisplay(key);
      return;
  }

  if (!validInputs.test(key)) return;

  event.preventDefault();
  if (key === 'Enter') {
      calculate();
  } else if (key === 'Backspace') { 
      backspace();
  } else if (key === '%') {
      appendToDisplay('%');
  } else {
      appendToDisplay(key);
  }
});

