function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
            
        case '-':
            return subtract(num1, num2);
        
        case '*':
            return multiply(num1, num2);
            
        case '/':
            return divide(num1, num2);
    }
}

let digits = '';
let firstNum = '';
let operator = '';
let secondNum = '';
let result;
let hasDecimal = false;


const displayBoxTop = document.getElementById('top');
const displayNumTop = document.createElement('p');
const displayBoxBottom = document.getElementById('bottom');
const displayNumBottom = document.createElement('p');

const digitBtns = document.querySelectorAll('.digit');
digitBtns.forEach(digitBtn => {
    digitBtn.addEventListener('click', storeInput);
});

const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', storeOperator)
});

const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', performOperation);

function storeInput(event) {
    let input = event.target.textContent;
    if(digits == '' && input == '.') {
        digits = '0.'
        hasDecimal = true;
    }else if(hasDecimal && input == '.'){
        return;
    }else{
        digits += input;
        if (input == '.') {
            hasDecimal = true;
        }
    }
    updateDisplay(digits);
}

function storeOperator(event) {
    operator = event.target.textContent;
    if(operator == 'x'){
        operator = '*';
    }else if (operator == '÷') {
        operator = '/';
    }

    if(typeof firstNum == 'string') {
        firstNum = Number(digits);
    }
    digits = '';
    clearDisplay();
}

function updateDisplay(num){
    displayNumBottom.textContent = num;
    displayBoxBottom.appendChild(displayNumBottom);
}

function clearDisplay(){
    displayBoxBottom.textContent = '';
}

function performOperation(){
    if(firstNum) {
        secondNum = Number(digits);
        clearDisplay();
        console.log('Before calc: ' + firstNum);
        console.log('Before calc: ' + operator);
        console.log('Before calc: ' + secondNum);
        result = operate(operator, firstNum, secondNum);
        updateDisplay(result);
        firstNum = result;
        console.log(result);
    }
    
}

//test floating point arithmatic numbers when timesing
//eg 1.01 x 3 = 3.030000000002













