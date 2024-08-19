const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const paddleSpeed = 4;
const ballSpeedX = 4;
const ballSpeedY = 4;

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballVelX = ballSpeedX;
let ballVelY = ballSpeedY;

const keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
};

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = '#fff';
    context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    context.beginPath();
    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    context.fill();
}

function update() {
    ballX += ballVelX;
    ballY += ballVelY;

    // Ball collision with top and bottom
    if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        ballVelY = -ballVelY;
    }

    // Ball collision with paddles
    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballVelX = -ballVelX;
    }
    if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballVelX = -ballVelX;
    }

    // Ball out of bounds
    if (ballX - ballSize < 0 || ballX + ballSize > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballVelX = -ballVelX;
    }

    // Paddle movement
    if (keys.w) leftPaddleY -= paddleSpeed;
    if (keys.s) leftPaddleY += paddleSpeed;
    if (keys.ArrowUp) rightPaddleY -= paddleSpeed;
    if (keys.ArrowDown) rightPaddleY += paddleSpeed;

    // Prevent paddles from going out of bounds
    if (leftPaddleY < 0) leftPaddleY = 0;
    if (leftPaddleY > canvas.height - paddleHeight) leftPaddleY = canvas.height - paddleHeight;
    if (rightPaddleY < 0) rightPaddleY = 0;
    if (rightPaddleY > canvas.height - paddleHeight) rightPaddleY = canvas.height - paddleHeight;
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }
});

gameLoop();
