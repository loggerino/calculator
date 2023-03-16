class Calculator {
    constructor(expressionElement, answerElement) {
        this.expressionElement = expressionElement;
        this.answerElement = answerElement;
        this.clear();
    }

    clear() {
        this.answer = '';
        this.expression = '';
        this.operation = undefined;
    }

    delete() {
        this.answer = this.answer.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.answer.includes('.')) return;
        this.answer = this.answer.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.answer === '') return;
        if (this.expression !== '') {
            this.compute();
        }
        this.operation = operation;
        this.expression = this.answer;
        this.answer = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.expression);
        const current = parseFloat(this.answer);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.answer = computation;
        this.operation = undefined;
        this.expression = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.answerElement.innerText = this.getDisplayNumber(this.answer);
        if (this.operation != null) {
            this.expressionElement.innerText = `${this.getDisplayNumber(this.expression)} ${this.operation}`;
        } else {
            this.expressionElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const expressionElement = document.querySelector('[data-expression]');
const answerElement = document.querySelector('[data-answer]');


const calculator = new Calculator(expressionElement, answerElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});