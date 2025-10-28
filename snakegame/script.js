const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

const box = 20;
let snake, direction, food, score, game;

document.addEventListener("keydown", changeDirection);
startBtn.addEventListener("click", startGame);

function startGame() {
  snake = [{ x: 200, y: 200 }];
  direction = "RIGHT";
  score = 0;
  food = randomFood();
  scoreDisplay.textContent = "Score: 0";

  if (game) clearInterval(game);
  game = setInterval(draw, 100);
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

function changeDirection(e) {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

 
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);


  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }


  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  
  if (headX === food.x && headY === food.y) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    food = randomFood();
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

 
  if (
    headX < 0 ||
    headY < 0 ||
    headX >= canvas.width ||
    headY >= canvas.height ||
    snake.some(seg => seg.x === headX && seg.y === headY)
  ) {
    clearInterval(game);
    alert("Game Over! Final Score: " + score);
    return;
  }

  snake.unshift(newHead);
}
