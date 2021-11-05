const numbers = document.querySelectorAll(".numbers");
const display = document.getElementById("display");
const clear = document.getElementById("clear");
const operators = document.querySelectorAll(".operators");
const equal = document.getElementById("equal");
const dot = document.getElementById("dot");
const negative = document.getElementById("negative");

let displayNumbers = [];
let operatorValue;
let displayCheck = true; // variable to check if the display has a value;
let operatorCheck = true; // variable to check if the operator has been clicked;
let test = false; // variable to prevent doing operations when clicking operators multiple times
let equalButton = false; // checks if equalbutton has been presed
let dotButton = false; // checks if dotbutton has been presed
let negativeButton = false; // checks if negatibutton has been presed

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
    dotButton = false;
    negativeButton = false;
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
// keyboard support for numbers
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

//delete button

function Clear(){
    display.textContent = "0";
    for (let i = 0; i < displayNumbers.length; i++) {
        displayNumbers.splice(0, 2);
    }
    operatorValue = undefined;
    dotButton = false;
    negativeButton = false;
}

//dot button
dot.addEventListener("click", Dot);

function Dot(){
    if (dotButton === false) {
        display.textContent += this.textContent;
        dotButton = true;
    }
    if (displayCheck === false || display.textContent === "0") {
        display.textContent = "0.";
        displayCheck = true;
    }
}

//negative button
negative.addEventListener("click", Negative);

function Negative(){
    if (display.textContent == "0" || display.textContent == "0."){
        return;
    } 
    if (negativeButton === false && display.textContent[0] !== "-") {
        display.textContent = "-".concat(display.textContent);
        if (displayNumbers.length == 1) {
            displayNumbers.splice(0, 1, display.textContent);
        }
        negativeButton = true;
    }
    else if(display.textContent != "0"){
        display.textContent = display.textContent.replace("-","");
        if (displayNumbers.length == 1) {
            displayNumbers.splice(0, 1, display.textContent);
        }
        negativeButton = false;
    }
}

//continue doing more operations
function Continue(){
    operatorCheck = false;
    displayCheck = false;
    equalButton = true;
    displayNumbers.pop();
    displayNumbers[0] = display.textContent;
}

function CheckReminder(a){
    if (a % 1 === 0) {
        display.textContent = a;
    }
    else{
        display.textContent = a.toFixed(2);
    }
}

function Add(a, b){
    let result = parseFloat(a) + parseFloat(b);
    CheckReminder(result);
    Continue();
}

function Subtract(a, b){
    let result = parseFloat(a) - parseFloat(b);
    CheckReminder(result);
    Continue();
}

function Multiply(a, b){
    let result = parseFloat(a) * parseFloat(b);
    CheckReminder(result);
    Continue();
}

function Divide(a, b){
    let result = parseFloat(a) / parseFloat(b);
    CheckReminder(result);
    Continue();
}

function Operate(first, operator, second){   
    if (displayNumbers.length === 0) {
        return;
    }
    
    else if (displayNumbers.length < 2) {
        displayNumbers.push(display.textContent);

    }else if (operatorCheck === true && displayNumbers.length === 2) {
        displayNumbers.pop();
        displayNumbers.push(display.textContent);
        console.log("yo");
    }
    if (equalButton === true) {
        console.log("yo1");
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
    1. numero en negativo seguido por igual da --- LISTO
    2. resultado negativo, no lo puedo quitar, solo se agrega otro simbolo negativo --- LISTO
    3. algun operador mas igual rompe calculadora -- MAS o Menos
*/
//AGREGAR KEYBOARD SUPPORT PARA TODO