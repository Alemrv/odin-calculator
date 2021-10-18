const numbers = document.querySelectorAll(".numbers");
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const operators = document.querySelectorAll(".operators");
const equal = document.getElementById("equal");

let displayNumbers = [];
let operatorValue;
let displayCheck = true; // variable to check if the display has a value;
let operatorCheck = true; // variable to check if the operator has been clicked;
let test = false; // variable to prevent doing operations when clicking operators multiple times
let equalButton = false; // checks if equalbutton has been presed

equal.addEventListener("click", Operate);

clear.addEventListener("click", Clear);

operators.forEach(operator =>{
    operator.addEventListener("click", Operators);
});

function Operators(){
    //
    if (test === true) {
        operatorValue = this.textContent;
        return;
    }
    if (operatorValue !== this.textContent && displayNumbers.length === 2) {
        Operate();
        operatorValue = this.textContent;
    }
    else{
        operatorValue = this.textContent;
    }
    //check if display is empty
    if (display.textContent !== ""){   
        if (displayNumbers.length < 2) {
            displayNumbers.push(display.textContent);
        }
        if (displayNumbers.length === 2 && operatorCheck === true) {
            Operate();  
        }else if(displayNumbers.length === 2 && operatorCheck === true && equalButton === true){
            displayNumbers.pop();
        }
    }
    displayCheck = false;
    operatorCheck = true;
    test = true;
    equalButton = false;
}

numbers.forEach(number =>{
    number.addEventListener("click", DisplayText);
});

function DisplayText(){
    test = false;
    equalButton = false;
    if (displayCheck === false || display.textContent === "0") {
        display.textContent = "";
        displayCheck = true;
    }
    if(display.textContent.length < 10 && displayCheck === true) {
       display.textContent+= this.textContent;

    }
    if(displayNumbers.length > 0 && displayNumbers.length < 2) {
        displayNumbers.push(this.textContent);
    }
}

document.addEventListener('keydown', Keyboard);

function Keyboard(event){
    test = false;
    equalButton = false;
    if (displayCheck === false || display.textContent === "0") {
        display.textContent = "";
        displayCheck = true;
    }
    if (Number(event.key) <= 9 && display.textContent.length < 10 && displayCheck === true) {
        display.textContent += Number(event.key);
    }
    if(displayNumbers.length > 0 && displayNumbers.length < 2) {
        displayNumbers.push(Number(event.key));
    }
}

function Clear(){
    display.textContent = "0";
    for (let i = 0; i < displayNumbers.length; i++) {
        displayNumbers.splice(0, 2);
    }
    operatorValue = undefined;
}

function Continue(){
    operatorCheck = false;
    displayCheck = false;
    equalButton = true;
    displayNumbers.pop();
    displayNumbers[0] = display.textContent;
    equal.addEventListener("click", ()=>{
    });
}

function Add(a, b){
    display.textContent = parseInt(a) + parseInt(b);
    Continue();
}

function Subtract(a, b){
    display.textContent = parseInt(a) - parseInt(b);
    Continue();
}

function Multiply(a, b){
    display.textContent = parseInt(a) * parseInt(b);
    Continue();
}

function Divide(a, b){
    display.textContent = parseInt(a) / parseInt(b);
    Continue();
}

function Operate(first, operator, second){   
    if (displayNumbers.length === 0) {
        return display.textContent = "0";
    }
    else if (displayNumbers.length < 2) {
        displayNumbers.push(display.textContent);
    }else if (operatorCheck === true && displayNumbers.length === 2) {
        displayNumbers.pop();
        displayNumbers.push(display.textContent);
    }
    if (equalButton === true) {
        return;
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

*/
 