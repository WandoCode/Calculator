/* Default values */
let calcul = {
            operator: "none",
            lastNum: 0,
            currentNum: 0,
        };

let arrayAns = [];

const operate = function(a, b, operator) {
    const numa = +a;
    const numb = +b;
    let res = 0;
    switch (operator) {
        case "add":
            res = add(numa, numb);
            break;

        case "subs":
            res = less(numa, numb);
            break;
            
        case "divide":
            res = divide(numa, numb);
            break;

        case "multiple":
            res = mult(numa, numb);
            break;

        default:
            break;
    }
    return res;
}

const add = function(a, b) {
    return a + b;
}

const less = function(a, b) {
    return a - b;
}

const divide = function(a, b) {
    return (b === 0) ? NaN : a / b;
}

const mult = function(a, b) {
    return a * b;
}

const buttonPressed = function(e) {
    if (e.target.classList.contains("num")){
        addToScreen(e.target.id);
    }
    else if (e.target.id == "clear") {
        arrayAns = [];
        screen.innerHTML = 0;
        calcul.operator = "none";
        calcul.lastNum = 0;
        calcul.currentNum = 0;
        return;
    } 
    else if (e.target.id == "plus-less") {
        calcul.lastNum = calcul.lastNum * -1;
    }
    else {

        if (calcul.operator == "none"){
            calcul.lastNum = arrayAns.join("");
        } 
        else if (calcul.operator != ""){
            calcul.currentNum = arrayAns.join("");
            calcul.lastNum = operate(calcul.lastNum, calcul.currentNum, calcul.operator);
        }

        arrayAns = [];
        calcul.operator = e.target.id == "equal" ? "" : e.target.id;
        screen.innerHTML = formatForScreen(calcul.lastNum);
    }
};

let formatForScreen = function(num) {
    const strNum = num.toString();
    if (strNum.length >= 12 && strNum.includes(".")) {
        num = Math.round(num * (10 ** 12))/ (10**12);
    }
    else if (strNum.length >= 12) {
        num = NaN; /*Number too hight*/
    }

    return num;
}


const addToScreen = function(num) {
    if (arrayAns.length > 12) {
        return;
    }
    else if (num == "." && arrayAns.includes(".")){
        return;
    }
    else if (arrayAns.length > 0){
        arrayAns.push(num);
    }
    else if (num == 0) {
        return;
    }
    else if (num == "."){
        arrayAns = ["0", "."];
    }
    else {
        arrayAns.push(num);
    }
    screen.innerHTML = arrayAns.join("");
}


/* Events listener */
const buttons = document.getElementsByClassName('button');
Array.from(buttons).forEach(button => {
    button.addEventListener("click", buttonPressed)
});

const screen = document.querySelector(".text-rep");

