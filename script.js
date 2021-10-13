const numbers = document.querySelectorAll(".numbers");
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const operators = document.querySelectorAll(".operators");
const equal = document.getElementById("equal");
let displayNumbers = [];
let operatorValue;
let displayCheck = true; // variable to check if the display has a value;
let operatorCheck = true; // variable to check if the operator has been clicked;
let equalCheck = true; // variable to check if the equal button has been clicked;

equal.addEventListener("click", Operate);

clear.addEventListener("click", Clear);

operators.forEach(operator =>{
    operator.addEventListener("click", Operators);
});

function Operators(){
    operatorValue = this.textContent;

    if (display.textContent !== ""){
        if (displayNumbers.length < 2) {
            displayNumbers.push(display.textContent);
        }
        if (equalCheck === false) {
            displayNumbers.pop();
            console.log(displayNumbers);
        }
        if (displayNumbers.length == 2 && operatorCheck === true) {
            displayNumbers.pop();
            Operate();
        }
        displayCheck = false;
        operatorCheck = true;
        equalCheck = true;
    }
}

numbers.forEach(number =>{
    number.addEventListener("click", DisplayText);
});

function DisplayText(){
    if (displayCheck === false) {
        display.textContent = "";
        displayCheck = true;
    }
    if(display.textContent.length < 10 && displayCheck === true) {
        
       display.textContent+= this.textContent;
    }
}

function Clear(){
    display.textContent = "";
    for (let i = 0; i < displayNumbers.length; i++) {
        displayNumbers.splice(0, 2);
    }
    console.log(displayNumbers);
    operatorValue = undefined;
}

function ContinueEqual(){
    displayNumbers[0] = display.textContent;
    operatorCheck = false;
    equalCheck = false;
    equal.addEventListener("click", ()=>{
        displayCheck = false;
    });
}

function Add(a, b){
    display.textContent = parseInt(a) + parseInt(b);
    ContinueEqual();
    console.log(operatorCheck);
    console.log(equalCheck);
}

function Subtract(a, b){
    display.textContent = parseInt(a) - parseInt(b);
    displayNumbers[0] = display.textContent;
    ContinueEqual();
}

function Multiply(a, b){
    display.textContent = parseInt(a) * parseInt(b);
    displayNumbers[0] = display.textContent;
    ContinueEqual();
}

function Divide(a, b){
    display.textContent = parseInt(a) / parseInt(b);
    displayNumbers[0] = display.textContent;
    ContinueEqual();
}

function Operate(first, operator, second){   
    if (displayNumbers.length < 2) {
        displayNumbers.push(display.textContent);
    }else if (operatorCheck === true && displayNumbers.length === 2) {
        displayNumbers.pop();
        displayNumbers.push(display.textContent);
    }
    operator = operatorValue;
    first = displayNumbers[0];
    second = displayNumbers[1];
    console.log(first, second);
    switch (operator) {
        case "+":
           return Add(first, second);

        case "-":
           return Subtract(first, second);

        case "*":
           return Multiply(first, second);

        case "/":
           return Divide(first, second);

        default:
           return "error";
        
    }
}

/*BUGS

1. Darle a un operador repetidas veces y que siga realizando operaciones con los valores almecenados.

*/
 