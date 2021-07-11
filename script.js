const displayBoxTop = document.getElementById('top');
const displayNumTop = document.createElement('p');
const displayBoxBottom = document.getElementById('bottom');
const displayNumBottom = document.createElement('p');

const digitBtns = document.querySelectorAll('.digit');
digitBtns.forEach(digitBtn => {
    digitBtn.addEventListener('click', input);
});

const operatorBtns = document.querySelectorAll('.operator');
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', storeOp)
});

const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', performOperation);

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearDisplay);

// const deleteBtn = document.querySelector('#delete');
// deleteBtn.addEventListener('click', x);

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

let currentNum = '';
let operator = '';
let firstNum = '';
let secondNum = '';
let hasDecimal = false;

//if trying to enter new numbers while result is displayed, reset display and current inputs, ready for new ones
function input(event){
    if(firstNum && !operator){
        clearDisplay();
    }
    
    let input = event.target.textContent;
    switch(input){
        //uses a bool variable to handle preventing the user from entering more than 1 decimal point
        case '.':
            if(!currentNum){
                currentNum = '0.';
                hasDecimal = true;
                break;
            }else if(hasDecimal){
                break;
            }else{
                hasDecimal = true;
                currentNum += input;
                break;
            }

        //ignore input if currentNum is 0 and user pressed another 0
        case '0':
            if(currentNum.startsWith('0') && currentNum.length == 1){
                break;
            }
        
            default:
            currentNum += input;
    }
    
    updateDisplay(currentNum);
}

function updateDisplay(num){
    displayNumBottom.textContent = num;
    displayBoxBottom.appendChild(displayNumBottom);
}

function clearDisplay(){
    currentNum = '';
    operator = '';
    firstNum = '';
    secondNum = '';
    hasDecimal = false;
    updateDisplay('');
}

function storeOp(event){
    if(!firstNum){
        firstNum = currentNum;
        currentNum = '';
    }
    
    //stepping into this statement means the user has entered a operator before pressing equals, so the previous result should display, allowing for stringing several operations together
    if(firstNum && currentNum) {
        performOperation();
    }
    
    operator = event.target.textContent;
    if(operator == 'x'){
        operator = '*';
    }else if(operator == '÷'){
        operator = '/';
    }
}

function performOperation(){
    if(firstNum && currentNum){
        firstNum = Number(firstNum);
        secondNum = Number(currentNum);
        currentNum = '';
        firstNum = operate(operator, firstNum, secondNum);
        if(String(firstNum).length > 14){
            firstNum = firstNum.toFixed(2);
        }

        if(firstNum === Infinity){
            clearDisplay();
            alert('Can\'t divide by zero!');
        }else{
            updateDisplay(firstNum);
            operator = '';
        }
    }
}























