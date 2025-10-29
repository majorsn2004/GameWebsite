const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");

let gameRunning = false;

//setup for the paddle and ball
const paddleHeight = 80;
const paddleWidth = 10;
const player = { x: 10, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
const ai = { x: canvas.width - paddleWidth - 10, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, size: 10, speedX: 4, speedY: 4 };

document.addEventListener("keydown", movePaddle);

function movePaddle(e) {
  if (e.key === "ArrowUp" && player.y > 0) player.y -= 30;
  else if (e.key === "ArrowDown" && player.y < canvas.height - paddleHeight) player.y += 30;
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speedX = -ball.speedX;
  ball.speedY = (Math.random() - 0.5) * 8;
}

function update() {
  if (!gameRunning) return;

  //ball moving
  ball.x += ball.speedX;
  ball.y += ball.speedY;

 
  if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
    ball.speedY *= -1;
  }

  //player paddle impact
  if (
    ball.x <= player.x + paddleWidth &&
    ball.y + ball.size >= player.y &&
    ball.y <= player.y + paddleHeight
  ) {
    ball.speedX *= -1;
  }

  //movement for ai
  if (ai.y + paddleHeight / 2 < ball.y) ai.y += 4;
  else ai.y -= 4;

  //ai paddle impact
  if (
    ball.x + ball.size >= ai.x &&
    ball.y + ball.size >= ai.y &&
    ball.y <= ai.y + paddleHeight
  ) {
    ball.speedX *= -1;
  }

  //scoring
  if (ball.x <= 0) {
    ai.score++;
    resetBall();
  }
  if (ball.x + ball.size >= canvas.width) {
    player.score++;
    resetBall();
  }

  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //middle line
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = "#ff009d";
  ctx.stroke();
  ctx.setLineDash([]);

  //paddles and ball
  ctx.fillStyle = "#00ff4c";
  ctx.fillRect(player.x, player.y, paddleWidth, paddleHeight);
  ctx.fillRect(ai.x, ai.y, paddleWidth, paddleHeight);
  ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

  //score
  ctx.font = "20px Arial";
  ctx.fillStyle = "#ffcc00";
  ctx.fillText(player.score, canvas.width / 2 - 50, 30);
  ctx.fillText(ai.score, canvas.width / 2 + 30, 30);
}


startBtn.addEventListener("click", () => {
  if (!gameRunning) {
    gameRunning = true;
    player.score = 0;
    ai.score = 0;
    resetBall();
    update();
  }
});
