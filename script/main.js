import { SniperScope } from './jingtou.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const enemyImagePath = 'src/image/enemy.png';
const backgroundImagePath = 'src/image/background_1.png';
const backgroundMusic = new Audio('src/background_music1.mp3');
const shootSound = new Audio('src/music/shoot.mp3');
const reloadSound = new Audio('src/music/reload.mp3');

backgroundMusic.loop = true; 
backgroundMusic.volume = 0.2;

const enemyImage = new Image();
const backgroundImage = new Image();
enemyImage.src = enemyImagePath;
backgroundImage.src = backgroundImagePath;

let score = 0;
const scoreDisplay = document.getElementById('scoreDisplay');

let time = 0; 
const timerDisplay = document.getElementById('timerDisplay');

const startButton = document.getElementById('start-button');
const gameCover = document.getElementById('game-cover');
const gameContainer = document.querySelector('.game-container');

startButton.addEventListener('click', () => {
  gameCover.style.display = 'none';
  gameContainer.style.display = 'block';

  document.getElementById('scoreDisplay').style.display = 'block';
  document.getElementById('timerDisplay').style.display = 'block';
  backgroundMusic.play();
  startEnemyMovement();
  setInterval(updateTimer, 1000);
});


const numEnemies = 10; 
const enemies = []; 
const enemySpawnPoints = [
  { x: 100, y: 150 },
  { x: 250, y: 300 },
  { x: 400, y: 100 },
  { x: 550, y: 350 },
  { x: 700, y: 200 },
  { x: 850, y: 450 },
  { x: 300, y: 500 },
  { x: 500, y: 250 },
  { x: 650, y: 400 },
  { x: 800, y: 150 }
];

const sniperScope = new SniperScope(canvas); 
let canShoot = true; 
const reloadDisplay = document.getElementById('reloadDisplay');

sniperScope.onShoot = (mouseX, mouseY) => {
  if (!canShoot) {
    reloadDisplayElement.style.display = 'block';
    return;
  }
  shootSound.play();
  const rect = canvas.getBoundingClientRect();
  const x = mouseX - rect.left;
  const y = mouseY - rect.top;

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    if (x >= enemy.x && x <= enemy.x + enemy.width &&
        y >= enemy.y && y <= enemy.y + enemy.height) {
      enemies.splice(i, 1);
      drawBackground();
      drawEnemies();
      updateScore();
      checkWinCondition();
      break;
    }
  }
  reloadSound.play();
  canShoot = false;
  reloadDisplayElement.style.display = 'none';
  setTimeout(() => {
    canShoot = true;
  }, 2000);
};

function generateEnemy() {
  for (let i = 0; i < numEnemies; i++) {
    const spawnPoint = enemySpawnPoints[i % enemySpawnPoints.length];
    const speedX = (Math.random() - 0.5) * 2; 
    const speedY = (Math.random() - 0.5) * 2;
    enemies.push({
      x: spawnPoint.x,
      y: spawnPoint.y,
      width: 80,
      height: 80,
      image: enemyImage,
      speedX: speedX,
      speedY: speedY
    });
  }
}

backgroundImage.onload = () => {
  drawBackground();
  generateEnemy();
  drawEnemies();
  startEnemyMovement();
  startBackgroundMusic();
};

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); 
}

function drawEnemies() {
  enemies.forEach(enemy => {
    ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
  });
}

function updateScore() {
  score += 1;
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateTimer() {
  time++;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function moveEnemies() {
  enemies.forEach(enemy => {
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;
    if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
      enemy.speedX = -enemy.speedX;
    }
    if (enemy.y <= 0 || enemy.y + enemy.height >= canvas.height) {
      enemy.speedY = -enemy.speedY;
    }
  });
}

function startBackgroundMusic() {
  backgroundMusic.play(); 
}

function startEnemyMovement() {
  setInterval(() => {
    moveEnemies();
    drawBackground();
    drawEnemies();
  }, 1000 / 60);  
}

function checkWinCondition() {
  if (score >= 10) {
    showWinMessage();
  }
}

function showWinMessage() {
  const winMessage = document.createElement('div');
  winMessage.textContent = 'You Win!';
  winMessage.style.position = 'absolute';
  winMessage.style.top = '50%';
  winMessage.style.left = '50%';
  winMessage.style.transform = 'translate(-50%, -50%)';
  winMessage.style.fontSize = '60px';
  winMessage.style.color = 'green';
  winMessage.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.7)';
  winMessage.style.zIndex = '1000';
  document.body.appendChild(winMessage);
}

const reloadDisplayElement = document.createElement('div');
reloadDisplayElement.textContent = 'Reloading';
reloadDisplayElement.style.position = 'absolute';
reloadDisplayElement.style.bottom = '10px';
reloadDisplayElement.style.left = '50%';
reloadDisplayElement.style.transform = 'translateX(-50%)';
reloadDisplayElement.style.fontSize = '30px';
reloadDisplayElement.style.color = 'red';
reloadDisplayElement.style.display = 'none'; // 初始隐藏
document.body.appendChild(reloadDisplayElement);
