const numbers = document.querySelectorAll(".numbers");
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const operators = document.querySelectorAll(".operators");
let operatorValue;
const equal = document.getElementById("equal");
let num1;
let num2;

equal.addEventListener("click", Operate);

clear.addEventListener("click", Clear);

numbers.forEach(number =>{
    number.addEventListener("click", DisplayText);
});

operators.forEach(operator =>{
    operator.addEventListener("click",() =>{
        operatorValue = operator.textContent;
        if (display.textContent !== "") {
            if (typeof(num1) === "undefined") {
                num1 = display.textContent;
            }
            else if (typeof(num2) === "undefined") {
                num2 = display.textContent;
            }
            console.log(num1, num2);
        }
    });
});

function DisplayText(){
    if (typeof(operatorValue) === "string") {
        display.textContent = "";
    }
    if (display.textContent.length < 10) {
        
       display.textContent+= this.textContent;
    }
}

function Clear(){
    display.textContent = "";
}

function Add(a, b){
    display.textContent = parseInt(a) + parseInt(b);
}

function Subtract(a, b){
    display.textContent = parseInt(a) - parseInt(b);
}

function Multiply(a, b){
    display.textContent = parseInt(a) * parseInt(b);
}

function Divide(a, b){
    display.textContent = parseInt(a) / parseInt(b);
}


function Operate(first, operator, second){
    operator = operatorValue;
    first = num1;
    second = num2;
    if (typeof(num2) === "undefined") {
        num2 = display.textContent;
    }
    switch (operator) {
        case "+":
           return Add(num1, num2);

        case "-":
           return Subtract(num1, num2);

        case "*":
           return Multiply(num1, num2);

        case "/":
           return Divide(num1, num2);

        default:
           return "error";
        
    }
}

//console.log(Operate(2, "/", 5));