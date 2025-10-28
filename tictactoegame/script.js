const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const messageDiv = document.getElementById('message');

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
let currentPlayer = "X";
let gameActive = false;

const size = canvas.width / 3; 


function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 3;
  for (let i = 1; i <= 2; i++) {
  
    ctx.beginPath();
    ctx.moveTo(i * size, 0);
    ctx.lineTo(i * size, canvas.height);
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(0, i * size);
    ctx.lineTo(canvas.width, i * size);
    ctx.stroke();
  }
}


function drawMove(row, col, player) {
  const x = col * size + size / 2;
  const y = row * size + size / 2;
  ctx.lineWidth = 5;
  if (player === "X") {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x - size / 3, y - size / 3);
    ctx.lineTo(x + size / 3, y + size / 3);
    ctx.moveTo(x + size / 3, y - size / 3);
    ctx.lineTo(x - size / 3, y + size / 3);
    ctx.stroke();
  } else {
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, size / 3, 0, Math.PI * 2);
    ctx.stroke();
  }
}


function checkWinner() {
  const lines = [

    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],

    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],

    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
  ];

  for (let line of lines) {
    const [a,b,c] = line;
    if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
      return board[a[0]][a[1]];
    }
  }
  if (board.flat().every(cell => cell)) return "Tie";
  return null;
}


canvas.addEventListener('click', (e) => {
  if (!gameActive) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const col = Math.floor(x / size);
  const row = Math.floor(y / size);

  if (board[row][col] !== "") return;

  board[row][col] = currentPlayer;
  drawMove(row, col, currentPlayer);

  const winner = checkWinner();
  if (winner) {
    if (winner === "Tie") {
      messageDiv.textContent = "It's a tie!";
    } else {
      messageDiv.textContent = `Player ${winner} wins!`;
    }
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
});


startBtn.addEventListener('click', () => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  gameActive = true;
  currentPlayer = "X";
  drawBoard();
  messageDiv.textContent = `Player ${currentPlayer}'s turn`;
});


drawBoard();
messageDiv.textContent = "Click 'Start Game' to play!";
