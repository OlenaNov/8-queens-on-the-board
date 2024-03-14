import { values } from './scr/constants';
import svgQueen from './scr/images/queen.svg'
import './style.css';

const board = document.querySelector("#board");

const makeQueenPosition = () => {
  let arrValues = [...values];
  const allPosition = [];

  for(let i = 0; i < 8; i += 1) {
    const currentPosition = arrValues[Math.floor(Math.random() * arrValues.length)];
    allPosition.push(currentPosition);

    arrValues = arrValues.filter(item => 
      !item.includes(currentPosition[0]) && !item.includes(currentPosition[1]) && item !== currentPosition);

  };
  return allPosition;
};

const makeMarkupBoard = () => {

  const allSquares = [];
  const positionsArr = makeQueenPosition();
  let isWhite = false;

  for(let i = 0; i < 64; i += 1) {

    const makeClasses = () => isWhite ? "white" : "black";

    const makeDataVal = () => {
      const arrValue = ["a", "b", "c", "d", "e", "f", "g", "h"];
      const letter = arrValue[Math.floor(i / 8)];
      const number = i % 8 + 1;
      return `${letter + number}`;
    };
    
    const square = () => {
      
    const dataVal = makeDataVal();
    const classes = makeClasses();
    const queen = positionsArr.includes(dataVal) ? `<img src=${svgQueen} alt="Queen" class="queen">` : "";

    if((i + 1) % 8 !== 0) {
      isWhite = !isWhite;
    };

    return `<div class="square ${classes}" data-val=${dataVal}>${queen}</div>`
  };

    allSquares.push(square());
  };

  return allSquares.join('');
};

const refresh = () => {
  board.innerHTML = '';
  board.insertAdjacentHTML('beforeend', makeMarkupBoard());
};

refresh();

document.getElementById("refresh").addEventListener("click", refresh);