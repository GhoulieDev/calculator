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
    operatorBtn.addEventListener('click', storeOperator);
});

const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', performOperation);

const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearDisplay);

const deleteBtn = document.querySelector('#delete');
deleteBtn.addEventListener('click', removeLastInput);

let currentNum = '';
let operator = '';
let firstNum = '';
let secondNum = '';
let hasDecimal = false;

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

//trying to enter new numbers while result is displayed, resets display and current inputs, ready for new ones
function storeInput(event){
    if(firstNum && !operator){
        clearDisplay();
    }
    
    if(currentNum.length < 12){
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
                //remove leading zero eg 0234 -> 234
                if(currentNum.charAt(0) == '0' && currentNum.charAt(1)){
                    if(currentNum.charAt(1) != '.'){
                        currentNum = currentNum.substr(1);
                    }
                }
        }
        updateBottomDisplay(currentNum);
        displayNumBottom.style.fontSize = '35px';
    }
    
}

function updateTopDisplay(num1, op, num2){
    if(op == '*'){
        op = 'x';
    }else if(op == '/'){
        op = '÷';
    }
    displayNumTop.textContent = num1 + ' ' + op + ' ' + num2;
    displayBoxTop.appendChild(displayNumTop);
}

function updateBottomDisplay(num){
    displayNumBottom.textContent = num;
    displayBoxBottom.appendChild(displayNumBottom);
    
}

function clearDisplay(){
    currentNum = '';
    operator = '';
    firstNum = '';
    secondNum = '';
    hasDecimal = false;
    updateBottomDisplay('');
    updateTopDisplay('', '', '');
}

function removeLastInput(){
    if(currentNum){
        currentNum = currentNum.substr(0, currentNum.length-1);
        updateBottomDisplay(currentNum);
    }
}

function storeOperator(event){
    if(!firstNum){
        firstNum = currentNum;
        currentNum = '';
    }
    
    //if the user has entered an operator before pressing equals, the previous result should display, allowing for stringing several operations together eg 7x2(14)+3 = 17
    if(firstNum && currentNum) {
        updateTopDisplay(firstNum, operator, '');
        performOperation();
    }
    
    operator = event.target.textContent;
    if(operator == 'x'){
        operator = '*';
    }else if(operator == '÷'){
        operator = '/';
    }
    if(firstNum){
        updateTopDisplay(firstNum, operator, '');
    }
    
}

function performOperation(){
    if(firstNum && currentNum){
        firstNum = Number(firstNum);
        secondNum = Number(currentNum);
        currentNum = '';
        updateTopDisplay(firstNum, operator, secondNum);
        firstNum = operate(operator, firstNum, secondNum);
        
        if(String(firstNum).length > 14){
            firstNum = firstNum.toFixed(2);
        }
        //removes trailing 0 on results, eg 3.30 -> 3.3
        if(firstNum % 1 != 0){
            firstNum = String(firstNum);
            if(firstNum.charAt(firstNum.length-1) == '0'){
                console.log(firstNum)
                firstNum = firstNum.substr(0, firstNum.length-1);
            }
        }
        //fail safe to stop numbers with exponents from overflowing screen
        if(String(firstNum).length > 16){
            displayNumBottom.style.fontSize = '22px';
        }

        if(firstNum == Infinity){
            clearDisplay();
            alert('Can\'t divide by zero!');
        }else{
            updateBottomDisplay(firstNum);
            operator = '';
        }
    }
}





















