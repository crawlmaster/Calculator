const display = document.getElementById('output');
const audio = document.getElementById('keyPress');

audio.volume = 0.3;
audio.playbackRate = 3;

const keys = document.querySelectorAll('.keypad div');

//calculator variables
let a = 0;
let b = 0;
let result = 0;
let operator = null;
let isActiveOperation = false;
let dotInserted = false;

function performCalculation(num1, num2, op) {
  if (op == '-') {
    return +num1 - +num2;
  }
  if (op == '+') {
    return +num1 + +num2;
  }
  if (op == 'x') {
    return +num1 * +num2;
  }
  if (op == '/') {
    return +num1 / +num2;
  }
}

const key = keys.forEach(element => {
  element.addEventListener('click', function() {
    console.log(`Pressed button with ID ${element.id}`);

    //check if dot is still in number
    if (display.innerHTML.includes('.') == false) {
      dotInserted = false;
    }

    //add digit to number
    if ('0' <= element.id && element.id <= '9') {
      if (display.innerHTML == '0') {
        display.innerHTML = '';
      }
      display.innerHTML += element.id;
      if (isActiveOperation) {
        b = +display.innerHTML;
      } else {
        a = +display.innerHTML;
      }
    }

    //reset calculator
    if (element.id == 'ac') {
      display.innerHTML = 0;
      a = 0; b = 0; result = 0; dotInserted = false; isActiveOperation = false;
    }

    //delete last digit
    if (element.id == 'del') {
      display.innerHTML = display.innerHTML.slice(0, -1);
      if (display.innerHTML == '') {
        display.innerHTML = '0';
      }
      if (isActiveOperation) {
        b = +display.innerHTML;
      } else {
        a = +display.innerHTML;
      }
    }

    //process of transforming number to percent
    if (element.id == 'perc') {
      dotInserted = true;
      display.innerHTML = +display.innerHTML / 100;
      if (isActiveOperation) {
        b = +display.innerHTML;
      } else {
        a = +display.innerHTML;
      }
    }

    //reverse number sign
    if (element.id == 'reverse-sign') {
      display.innerHTML = +display.innerHTML * -1;
      if (isActiveOperation) {
        b = +display.innerHTML;
      } else {
        a = +display.innerHTML;
      }
    }

    //handling dot insertion
    if (element.id == '.' && !dotInserted) {
      dotInserted = true;
      display.innerHTML += '.';
    }

    //handling an operation
    if (element.id == '-' || element.id == 'x' || element.id == '+' || element.id == '/') {
      isActiveOperation = true;
      operator = element.id;
      display.innerHTML = '0';
      operator = element.id;
    }

    //output the result and save it
    if (element.id == '=' && operator != null) {
      dotInserted = false;
      isActiveOperation = false;
      result = performCalculation(a, b, operator);
      operator = null;
      console.log(result);
      display.innerHTML = String(result);
      a = +display.innerHTML;
      b = 0;
    }


    //debug data below
    console.log(`display: ${display.innerHTML}, ${typeof display.innerHTML} a = ${a} b = ${b} operator = ${operator} dotInserted = ${dotInserted} isActiveOperation = ${isActiveOperation} a is ${typeof a} b is ${typeof b}`);
    audio.currentTime = 0;
    audio.play();

    //check if dot is in the number(again because I ran into issues after performing an operation with numbers with decimal places)
    if (display.innerHTML.includes('.') == true) {
      dotInserted = true;
    } else {
      dotInserted = false;
    }
  });
});