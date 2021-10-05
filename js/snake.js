"use strict";

console.log("Lodash is here: 1+2 =", _.add(1, 2));

const snakeField = document.querySelector(".snake-field");
const startBtn = document.querySelector(".snake-result__start-btn ");

/*
const oneBlock() => {
    
    const result = `<div class="one-block"></div> `;

    return result;
}
 */
let treasureNumber = 70;
let score = 0;
let treasureLeft = treasureNumber;
let treasureEaten = 0;
const fieldWidth = 24;
const fieldHeight = 25;

let treasureMap = Array.from(Array(fieldWidth + 2), () => new Array(fieldHeight + 2));
/* let snakeLocationX = 13;
let snakeLocationY = 13;
let snakeSize = 1; */

class Snake {
  defaultLocationX = 13;
  defaultLocationY = 13;
  locationX;
  locationY;
  size;

  constructor(locationX = 13, locationY = 13, size = 1) {
    this.locationX = locationX;
    this.locationY = locationY;
    this.size = size;
  }

  gameReset() {
    snakeField.innerHTML = "";
    this.locationX = this.defaultLocationX;
    this.locationY = this.defaultLocationY;
    treasureLeft = treasureNumber;
    treasureEaten = 0;
  }
}
/* let snake = {
    locationX: 10,
    locationY: 10,
    size: 10,

} */
// 24 x 25

const date = new Date();
document.querySelector(".js-date").textContent = `${date.getDate().toString().padStart(2, "0")}.
  ${(date.getMonth() + 1).toString().padStart(2, "0")}`;

let clockId = null;
const startClock = function () {
  if (clockId) clearInterval(clockId);
  let sec = 0;
  let min = 0;
  clockId = setInterval((param) => {
    if (sec === 59) {
      sec = 0;
      document.querySelector(".js-clock-min").textContent = (++min).toString(10).padStart(2, "0");
    }
    document.querySelector(".js-clock-sec").textContent = (++sec).toString(10).padStart(2, "0");
  }, 1000);
};

/* const isTheEnd = function () {
  const checkedNodeRight = snakeField.querySelector(`div[data-location = '${snake.locationX+1},${snake.locationY}']`);
  const checkedNodeLeft = snakeField.querySelector(`div[data-location = '${snake.locationX-1},${snake.locationY}']`);
  const checkedNodeDown = snakeField.querySelector(`div[data-location = '${snake.locationX},${snake.locationY+1}']`);
  const checkedNodeUp = snakeField.querySelector(`div[data-location = '${snake.locationX},${snake.locationY-1}']`);
  isFieldBorderHere()
  isSnakeBodyHere()

} */

const winner = function () {
  document.removeEventListener("keydown", handleArrowFunction);
  clearInterval(clockId);
  clockId = null;
  for (let row = 1; row <= fieldHeight; row += 1) {
    for (let col = 1; col <= fieldWidth; col += 1) {
      snakeField.querySelector(`div[data-location = '${col},${row}']`).style.backgroundColor = "orange";
    }
  }
};

const snake = new Snake();
let snakeColor = "green";

const showSnake = function () {
  const snakePlace = snakeField.querySelector(`div[data-location = '${snake.locationX},${snake.locationY}']`);
  snakePlace.style.backgroundColor = snakeColor;
};

const handleClick = document.addEventListener("click", (e) => {
  console.log(e.target);
});

const setApplesNumber = function () {
  const applesNumber = parseInt(document.querySelector(".footer-container__apples-number").value);
    console.log(applesNumber);
  if (applesNumber) {
    console.log(typeof applesNumber);
    treasureNumber = applesNumber <= 0 ? 1 : applesNumber;
    treasureNumber = applesNumber > 100 ? 100 : applesNumber;
    document.querySelector(".footer-container__apples-number").value = treasureNumber;
    console.log(treasureNumber);
  }
};

const handleStartBtn = startBtn.addEventListener("click", (e) => {
  const handleArrow = document.addEventListener("keydown", handleArrowFunction);
  setApplesNumber();
  snake.gameReset();
  buildSnakeField();
  setTreasureMap();
  showSnake();
  document.querySelector(".snake-result__eaten-apples").textContent = "0";
  document.querySelector(".snake-result__apples-left").textContent = `${treasureNumber}`;
  startClock();
});

const eatenApplesSpan = document.querySelector(".snake-result__eaten-apples");
const leftApplesSpan = document.querySelector(".snake-result__apples-left");

const isTreasureHere = function (offsetX, offsetY) {
  const checkedNode = treasureMap[snake.locationX + offsetX][snake.locationY + offsetY];
  if (checkedNode.treasure !== "true") return false;
  /* console.log("->", checkedNode.type); */
  console.log("МНЯМ!");
  if (checkedNode.type === "diamond") {
    score += 100;
  } else if (checkedNode.type === "apple") {
    score += 10;
  }
  checkedNode.treasure = "false";
  checkedNode.type = "";
  const eatenApple = snakeField.querySelector(
    `div[data-location = '${snake.locationX + offsetX},${snake.locationY + offsetY}']`
  );
  eatenApple.style.backgroundImage = `url(./images/eatenapple.jpg)`;

  treasureLeft -= 1;
  treasureEaten += 1;

  eatenApplesSpan.textContent = treasureEaten;
  leftApplesSpan.textContent = treasureLeft;

  if (treasureLeft === 0) {
    winner();
  }

  return true;
};

const isFieldBorderHere = function (offsetX, offsetY) {
  const checkedNode = treasureMap[snake.locationX + offsetX][snake.locationY + offsetY];
  if (
    snake.locationY + offsetY === 0 ||
    snake.locationY + offsetY === fieldHeight + 1 ||
    snake.locationX + offsetX === 0 ||
    snake.locationX + offsetX === fieldWidth + 1
  ) {
    console.log("Border !");
    return true;
  }
  return false;
};

const isSnakeBodyHere = function (offsetX, offsetY) {
  const checkedNode = snakeField.querySelector(
    `div[data-location = '${snake.locationX + offsetX},${snake.locationY + offsetY}']`
  );

  if (checkedNode.style.backgroundColor === snakeColor) {
    return true;
  }
  return false;
};

function handleArrowFunction(e) {
  /*   isTheEnd(); */
  if (e.key === "ArrowUp") {
    /* snake.locationY -= 1; */
    if (!isFieldBorderHere(0, -1))
      if (!isSnakeBodyHere(0, -1)) {
        isTreasureHere(0, -1);
        snake.locationY -= 1;
      }
    showSnake();
    console.log("up");
  }
  if (e.key === "ArrowDown") {
    if (!isFieldBorderHere(0, 1))
      if (!isSnakeBodyHere(0, 1)) {
        isTreasureHere(0, 1);
        snake.locationY += 1;
      }
    showSnake();
    console.log("down");
  }
  if (e.key === "ArrowLeft") {
    if (!isFieldBorderHere(-1, 0))
      if (!isSnakeBodyHere(-1, 0)) {
        isTreasureHere(-1, 0);
        snake.locationX -= 1;
      }
    showSnake();
    console.log("left");
  }
  if (e.key === "ArrowRight") {
    if (!isFieldBorderHere(1, 0))
      if (!isSnakeBodyHere(1, 0)) {
        isTreasureHere(1, 0);
        snake.locationX += 1;
      }
    showSnake();
    console.log("right");
  }
}

const setTreasureMap = function () {
  let count = 1;
  do {
    let randomRow = parseInt(Math.random() * (fieldHeight - 1) + 1);
    let randomCol = parseInt(Math.random() * (fieldWidth - 1) + 1);
    if (treasureMap[randomCol][randomRow].treasure === "false") {
      treasureMap[randomCol][randomRow].treasure = "true";
      treasureMap[randomCol][randomRow].type = "apple";

      /*     console.log(randomCol, randomRow, treasureMap[randomCol][randomRow].treasure); */
      const node = snakeField.querySelector(`div[data-location = '${randomCol},${randomRow}']`);
      node.style.backgroundRepeat = `no-repeat`;
      node.style.backgroundSize = `contain`;
      node.style.backgroundImage = `url(./images/apple.jpg)`;
      /*       console.log(node); */
      count += 1;
    }
  } while (count <= treasureNumber);
};

const buildSnakeField = function () {
  for (let row = 1; row <= fieldHeight; row += 1) {
    for (let col = 1; col <= fieldWidth; col += 1) {
      snakeField.insertAdjacentHTML("beforeend", `<div class="one-block" data-location="${col},${row}""></div> `);
      treasureMap[col][row] = {
        treasure: "false",
        type: "",
      };
      /*       console.log(col, row, treasureMap[col][row].treasure); */
    }
  }
};
