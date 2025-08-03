document.addEventListener('DOMContentLoaded', function () {
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('#container > div');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const value = button.textContent;

      if (value === 'AC' || value === 'CE') {
        display.textContent = '0';
      }
      else if (value === '⌫') {
        if (display.textContent.length > 1) {
          display.textContent = display.textContent.slice(0, -1);
        } else {
          display.textContent = '0';
        }
      }
      else if (value === '=') {
        try {
          let expression = display.textContent;
          expression = expression.replace(/×/g, '*');
          expression = expression.replace(/÷/g, '/');
          expression = expression.replace(/−/g, '-');

          const result = eval(expression);
          display.textContent = result;
        } catch (error) {
          display.textContent = 'Error';
        }
      }
      else if (value === '+/−') {
        if (display.textContent.startsWith('-')) {
          display.textContent = display.textContent.substring(1);
        } else {
          display.textContent = '-' + display.textContent;
        }
      }
      else {
        if (display.textContent === '0') {
          display.textContent = value;
        } else {
          display.textContent += value;
        }
      }
    });
  });
});
