const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 20;
const paddleSpeed = 25;
const ballSpeed = 8; // Increased speed of the ball
const aiSpeed = 3; // Speed at which the AI moves

let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballVelX = 0;
let ballVelY = 0;

// Control keys
const keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
};

function resetBall() {
    // Reset ball to center
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    // Generate a random angle between 45 and 135 degrees (π/4 to 3π/4 radians)
    let angle = Math.random() * (Math.PI / 2) + Math.PI / 4;

    // Set ball velocity based on the random angle and speed
    ballVelX = ballSpeed * Math.cos(angle);
    ballVelY = ballSpeed * Math.sin(angle);

    // Ensure the ball is moving in a random direction (left or right)
    if (Math.random() > 0.5) {
        ballVelX = -ballVelX;
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = '#fff';
    context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

    // Draw ball
    context.fillStyle = 'red'; // Set ball color to red
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
        resetBall();
    }

    // Player paddle movement
    if (keys.w) leftPaddleY -= paddleSpeed;
    if (keys.s) leftPaddleY += paddleSpeed;

    // AI paddle movement
    if (ballY > rightPaddleY + paddleHeight / 2) {
        rightPaddleY += aiSpeed;
    } else {
        rightPaddleY -= aiSpeed;
    }

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

// Initialize ball movement
resetBall();

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
