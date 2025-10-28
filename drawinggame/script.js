const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearBtn = document.getElementById("clearBtn");
const rainbowBtn = document.getElementById("rainbowBtn");

let drawing = false;
let rainbowMode = false;
let hue = 0;


canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("mousemove", draw);

clearBtn.addEventListener("click", clearCanvas);
rainbowBtn.addEventListener("click", toggleRainbow);


function startDrawing(e) {
  drawing = true;
  draw(e);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";

  if (rainbowMode) {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    hue = (hue + 3) % 360;
  } else {
    ctx.strokeStyle = colorPicker.value;
  }

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleRainbow() {
  rainbowMode = !rainbowMode;
  rainbowBtn.textContent = rainbowMode ? "Rainbow: ON" : "Rainbow: OFF";
  rainbowBtn.classList.toggle("active", rainbowMode);
}
