const numbers = document.querySelectorAll(".numbers");
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const operators = document.querySelectorAll(".operators");
const equal = document.getElementById("equal");
let displayNumbers = [];
let operatorValue;
let displayCheck = true;
let operatorCheck = false;

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
        if (displayNumbers.length == 2) {
            Operate();
        }
        displayCheck = false;
    }
    console.log(displayNumbers)
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
    equal.addEventListener("click", ()=>{
        displayNumbers[0] = display.textContent;
        displayCheck = false;
    });
 
}

function ContinueOperator(){
 
}

function Add(a, b){
    display.textContent = parseInt(a) + parseInt(b);
    ContinueEqual();
}

function Subtract(a, b){
    display.textContent = parseInt(a) - parseInt(b);
    ContinueEqual();
}

function Multiply(a, b){
    display.textContent = parseInt(a) * parseInt(b);
    ContinueEqual();
}

function Divide(a, b){
    display.textContent = parseInt(a) / parseInt(b);
    ContinueEqual();
}

function Operate(first, operator, second){   
    if (displayNumbers.length < 2) {
        displayNumbers.push(display.textContent);
    }
    operator = operatorValue;
    first = displayNumbers[0];
    second = displayNumbers[1];
    console.log(first,second);
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

//console.log(Operate(2, "/", 5));