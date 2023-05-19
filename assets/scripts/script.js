class Calculator {
  constructor(input, prevInput) {
    this.prevInput = prevInput;
    this.input = input;
    this.clear();
  }

  //function to delete the last number/operation
  delete() {
    this.input = this.input.slice(0, -1);
  }

  //function to clear entire history
  clear() {
    this.input = "";
    this.prevInput = "";
    this.operator = undefined;
  }

  //function to append digit(as a string) to the end of the string
  appendNumber(number) {
    if (number === "." && this.input.includes(".")) return;
    this.input = this.input.toString() + number.toString();
  }

  //function to append specific operator
  selectOperation(operator) {
    //prevents user from choosing an operator twice
    if (this.input === "") return;
    //checks if theres a number in previous input
    if (this.prevInput !== "") {
      //auto perform a computation
      this.compute();
    }
    this.operator = operator;
    this.prevInput = this.input;
    this.input = "";
  }

  compute() {
    let result;
    const prev = parseFloat(this.prevInput);
    const current = parseFloat(this.input);
    const fixFloatingPoint = (val) => Number.parseFloat(val.toFixed(15));
    //prevents user from returning result if inputs are empty
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "/":
        result = prev / current;
        break;
      case "x":
        result = prev * current;
        break;
      default:
        return;
    }
    this.input = fixFloatingPoint(result);
    this.operator = undefined;
    this.prevInput = "";
  }

  //function to update display of calculator
  updateDisplay() {
    input.textContent = this.input;
    prevInput.textContent = this.prevInput;
  }
}

// selectors for buttons
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-reset]");
const equalsBtn = document.querySelector("[data-equals]");

let input = document.querySelector("#input");
let prevInput = document.querySelector("#prevInput");

const calculator = new Calculator(input, prevInput);

//add a click event listener to buttons
numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.textContent);
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.textContent);
    calculator.selectOperation(button.textContent);
    calculator.updateDisplay();
  });
});

deleteBtn.addEventListener("click", (button) => {
  console.log(deleteBtn.textContent);
  calculator.delete();
  calculator.updateDisplay();
});

clearBtn.addEventListener("click", (button) => {
  console.log(clearBtn.textContent);
  calculator.clear();
  calculator.updateDisplay();
});

equalsBtn.addEventListener("click", (button) => {
  console.log(equalsBtn.textContent);
  calculator.compute();
  calculator.updateDisplay();
});

//theme switcher
const html = document.querySelector("html");
const themeOptions = document.getElementsByName("toggleOption");

html.dataset.theme = "theme-1";

themeOptions.forEach((themes) => {
  themes.addEventListener("click", changeTheme);
});

function changeTheme(e) {
  let value = e.target.value;
  if (value === "1") {
    console.log("theme 1");
    html.dataset.theme = `theme-${value}`;
  } else if (value === "2") {
    console.log("theme 2");
    html.dataset.theme = `theme-${value}`;
  } else {
    console.log("theme 3");
    html.dataset.theme = `theme-${value}`;
  }
}
