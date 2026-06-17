import { useState } from 'react';
import './Calculator.css';

const BUTTONS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculate = (a, b, operator) => {
    switch (operator) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) setDisplay(display + '.');
  };

  const handleOperator = (operator) => {
    const current = parseFloat(display);
    if (prev !== null && !waitingForOperand) {
      const result = calculate(prev, current, op);
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOp(operator);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    if (op === null || waitingForOperand) return;
    const current = parseFloat(display);
    const result = calculate(prev, current, op);
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setWaitingForOperand(false);
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleClick = (label) => {
    if (label === 'C') return handleClear();
    if (label === '±') return handleToggleSign();
    if (label === '%') return handlePercent();
    if (label === '.') return handleDecimal();
    if (label === '=') return handleEquals();
    if (['+', '−', '×', '÷'].includes(label)) return handleOperator(label);
    handleNumber(label);
  };

  const isOperator = (label) => ['+', '−', '×', '÷'].includes(label);

  return (
    <div className="calculator">
      <div className="display">
        <span>{display}</span>
      </div>
      <div className="buttons">
        {BUTTONS.map((row, ri) => (
          <div key={ri} className="row">
            {row.map((label) => (
              <button
                key={label}
                className={`btn ${label === '0' ? 'btn-wide' : ''} ${isOperator(label) || label === '=' ? 'btn-op' : ''} ${['C', '±', '%'].includes(label) ? 'btn-fn' : ''}`}
                onClick={() => handleClick(label)}
              >
                {label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
