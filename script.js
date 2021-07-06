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

let firstNum = '';
let digit;
let operator = '';
let secondNum = ''

const displayBox = document.getElementById('display');
const displayNumberTop = document.getElementById('top');
const displayNumberBottom = document.getElementById('bottom');
const displayNum = document.createElement('p');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', storeInput);
})

function storeInput(event) {
   
}



// if(event.target.classList.contains('operator')) {
//     firstNum = Number(firstNum);
//     operator = event.target.textContent;
//     displayBox.removeChild(displayNums);
    
// }else if(event.target.classList.contains('equals')){
//     secondNum = Number(secondNum);
//     displayBox.removeChild(displayNums);
//     result = operate(operator, firstNum, secondNum);
//     displayNums.textContent = result;
//     displayBox.appendChild(displayNums);
    
    
// }else if (typeof firstNum == 'string') {
//     digit = event.target.textContent;
//     firstNum = firstNum + digit;
//     displayNums.textContent = firstNum;
//     displayBox.appendChild(displayNums);
// }else{
//     digit = event.target.textContent;
//     secondNum = secondNum + digit;
//     displayNums.textContent = secondNum;
//     displayBox.appendChild(displayNums);
// }