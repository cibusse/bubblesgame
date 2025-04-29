// SELECT CANVAS
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// LOAD IMAGES
const background = new Image();
background.src = 'images/background.png';
const playerImg = new Image();
playerImg.src = 'images/pink_bubble.png';
const cactusImg = new Image();
cactusImg.src = 'images/cactus.png';
const tumbleweedImg = new Image();
tumbleweedImg.src = 'images/tumbleweed.png';
const arrowImg = new Image();
arrowImg.src = 'images/arrow.png'; 

// LOAD SOUNDS
const bubbleSound = new Audio('sounds/bubble.mp3');
const popSound = new Audio('sounds/pop.mp3');
const shootSound = new Audio('sounds/shoot.mp3');
const ohNoSound = new Audio('sounds/oh_no.mp3');

// PLAYER OBJECT
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    lives: 5,
    canShoot: true
};

// ARRAYS
let cacti = [];
let bullets = [];
let tumbleweeds = [];

// SCORE
let score = 0;

// GAME STATE
let gameOver = false;
let running = false; 

// CONTROL INPUTS
const keys = {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false
};

// EVENT LISTENERS
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') keys.ArrowRight = true;
    if (e.key === 'ArrowLeft') keys.ArrowLeft = true;
    if (e.key === 'ArrowUp') keys.ArrowUp = true;
    if (e.key === 'ArrowDown') keys.ArrowDown = true;
    if (e.key === ' ' && player.canShoot && running && !gameOver) {
        shootBubble();
    }
    if (e.key === 'r' || e.key === 'R') {
        restartGame();
    }
    if (e.key === 's' || e.key === 'S') {
        toggleGame();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') keys.ArrowRight = false;
    if (e.key === 'ArrowLeft') keys.ArrowLeft = false;
    if (e.key === 'ArrowUp') keys.ArrowUp = false;
    if (e.key === 'ArrowDown') keys.ArrowDown = false;
});

// FUNCTIONS
function toggleGame() {
    if (!running) {
        running = true;
        if (gameOver) restartGame();
        update();
    } else {
        running = false;
    }
}

function shootBubble() {
    bullets.push({ x: player.x + player.width / 2 - 5, y: player.y, radius: 5 });
    shootSound.play();
    player.canShoot = false;
    setTimeout(() => { player.canShoot = true; }, 400);
}

function spawnCactus() {
    const size = 50;
    const x = Math.random() * (canvas.width - size);
    cacti.push({ x: x, y: canvas.height, width: size, height: size });
}

function spawnTumbleweed() {
    const size = 30;
    const x = Math.random() * canvas.width;
    const speed = Math.random() * 1 + 0.5;
    tumbleweeds.push({ x: x, y: Math.random() * canvas.height, size: size, speed: speed });
}

function movePlayer() {
    if (keys.ArrowRight && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
}

function moveCacti() {
    cacti.forEach(cactus => {
        cactus.y -= 1; // Move up
    });
}

function moveBullets() {
    bullets.forEach(bullet => {
        bullet.y -= 5;
    });
}

function moveTumbleweeds() {
    tumbleweeds.forEach(t => {
        t.x += t.speed;
        if (t.x > canvas.width) t.x = -t.size;
    });
}

function detectCollisions() {
    cacti.forEach((cactus, cIndex) => {
        bullets.forEach((bullet, bIndex) => {
            if (bullet.x > cactus.x && bullet.x < cactus.x + cactus.width &&
                bullet.y > cactus.y && bullet.y < cactus.y + cactus.height) {
                popSound.play();
                cacti.splice(cIndex, 1);
                bullets.splice(bIndex, 1);
                score += 10;
            }
        });

        if (player.x < cactus.x + cactus.width &&
            player.x + player.width > cactus.x &&
            player.y < cactus.y + cactus.height &&
            player.y + player.height > cactus.y) {
            popSound.play();
            player.lives--;
            cacti.splice(cIndex, 1);

            if (player.lives > 0) {
                bubbleSound.play();
            } else {
                ohNoSound.play();
                gameOver = true;
                running = false;
            }
        }
    });
}

function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function drawCacti() {
    cacti.forEach(cactus => {
        ctx.drawImage(cactusImg, cactus.x, cactus.y, cactus.width, cactus.height);
    });
}

function drawBullets() {
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,182,193,0.8)';
        ctx.fill();
    });
}

function drawTumbleweeds() {
    tumbleweeds.forEach(t => {
        ctx.drawImage(tumbleweedImg, t.x, t.y, t.size, t.size);
    });
}

function drawScore() {
    ctx.fillStyle = 'pink';
    ctx.font = '24px Comic Sans MS';
    ctx.fillText(`Score: ${score}`, 20, 40);
    ctx.fillText(`Lives: ${player.lives}`, 20, 70);
}

function drawGameOver() {
    ctx.fillStyle = 'pink';
    ctx.font = '60px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '40px Comic Sans MS';
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);
}

function restartGame() {
    gameOver = false;
    running = true;
    player.lives = 5;
    player.x = canvas.width / 2 - 25;
    player.y = canvas.height - 100;
    score = 0;
    cacti = [];
    bullets = [];
    tumbleweeds = [];
    for (let i = 0; i < 3; i++) spawnTumbleweed();
    bubbleSound.play();
    update();
}

// GAME LOOP
function update() {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    movePlayer();
    moveCacti();
    moveBullets();
    moveTumbleweeds();
    detectCollisions();

    drawTumbleweeds();
    drawPlayer();
    drawCacti();
    drawBullets();
    drawScore();

    if (gameOver) {
        drawGameOver();
        return;
    }

    requestAnimationFrame(update);
}

// INTERVALS FOR POPING CACTI
setInterval(() => {
    if (running && !gameOver) spawnCactus();
}, 2000);

// STARTING CONDITIONS
for (let i = 0; i < 3; i++) {
    spawnTumbleweed();
}
