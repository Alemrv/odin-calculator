function Add(a, b){
    return a + b;
}

function Subtract(a, b){
    return a - b;
}

function Multiply(a, b){
    return a * b;
}

function Divide(a, b){
    return a / b;
}

function Operate(num1, operator, num2){
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

console.log(Operate(2, "/", 5));