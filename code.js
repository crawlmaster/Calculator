const display = document.querySelector('.display #output');
const audio = document.getElementById('keyPress');

let a = 0;
let b = 0;
let result = 0;
let operator = null;
let dotInserted = false;

// function playKeyPressSound() {
//   audio.currentTime = 0;
//   audio.volume = 0.3;
//   audio.play();
// }

function updateDisplay(value) {
  display.innerHTML = value;
}

function clearCalculator() {
  a = 0;
  b = 0;
  result = 0;
  operator = null;
  dotInserted = false;
  updateDisplay('0');
}

function handleNumberClick(number) {
  if (!operator) {
    a = parseFloat(a.toString() + number);
    updateDisplay(a);
  } else {
    b = parseFloat(b.toString() + number);
    updateDisplay(b);
  }
}

function handleDotClick() {
  if (!dotInserted) {
    if (!operator) {
      a = parseFloat(a.toString() + '.');
      updateDisplay(a);
    } else {
      b = parseFloat(b.toString() + '.');
      updateDisplay(b);
    }
    dotInserted = true;
  }
}

function handleOperatorClick(op) {
  if (!operator) {
    operator = op;
    dotInserted = false;
  } else {
    performCalculation();
    operator = op;
    dotInserted = false;
  }
}

function performCalculation() {
  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case 'x':
      result = a * b;
      break;
    case ':':
      result = a / b;
      break;
    default:
      break;
  }
  a = result;
  b = 0;
  updateDisplay(result);
}

function handleEqualClick() {
  if (operator) {
    performCalculation();
    operator = null;
  }
}

function handlePercentageClick() {
  if (!operator) {
    a = a / 100;
    updateDisplay(a);
  } else {
    b = b / 100;
    updateDisplay(b);
  }
  dotInserted = true;
}

function handleSignReverseClick() {
  if (!operator) {
    a = -a;
    updateDisplay(a);
  } else {
    b = -b;
    updateDisplay(b);
  }
}

function handleDeleteClick() {
  if (!operator) {
    a = parseFloat(a.toString().slice(0, -1));
    updateDisplay(a);
  } else {
    b = parseFloat(b.toString().slice(0, -1));
    updateDisplay(b);
  }
}

document.querySelectorAll('.keypad div').forEach((element) => {
  element.addEventListener('click', () => {
    const { id } = element;
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.playbackRate = 2;
    audio.play();

    switch (id) {
      case 'ac':
        clearCalculator();
        break;
      case 'del':
        handleDeleteClick();
        break;
      case 'perc':
        handlePercentageClick();
        break;
      case 'reverse-sign':
        handleSignReverseClick();
        break;
      case '.':
        handleDotClick();
        break;
      case '+':
      case '-':
      case 'x':
      case ':':
        handleOperatorClick(id);
        break;
      case '=':
        handleEqualClick();
        break;
      default:
        handleNumberClick(id);
        break;
    }
  });
});
