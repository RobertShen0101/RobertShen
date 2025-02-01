import { SniperScope } from './jingtou.js';
import { Gun } from './gun.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const enemyImagePath = 'src/image/enemy.png';
const backgroundImagePath = 'src/image/background_1.png';
const shootSound = new Audio('src/music/shoot.mp3');
const reloadSound = new Audio('src/music/reload.mp3');
const getShotSound = new Audio('src/music/getshot.mp3');

// 获取选关页面和按钮
const chooseLevelPage = document.getElementById('choose-level-page');
const level1Button = document.getElementById('level-1-button');
const level2Button = document.getElementById('level-2-button');
const level3Button = document.getElementById('level-3-button');

// 获取开始界面和游戏界面
const gameContainer = document.querySelector('.game-container');
const gameCover = document.getElementById('game-cover');

// 获取开始按钮
const startButton = document.getElementById('start-button');

// 监听选关按钮的点击事件
level1Button.addEventListener('click', () => {
    startGame(1);  // 跳转到第一关
});

level2Button.addEventListener('click', () => {
    startGame(2);  // 跳转到第二关
});

level3Button.addEventListener('click', () => {
    startGame(3);  // 跳转到第三关
});

// 点击开始按钮后显示选关页面
startButton.addEventListener('click', () => {
    gameCover.style.display = 'none';
    chooseLevelPage.style.display = 'flex';  // 显示选关页面
});

// 跳转到游戏界面并开始指定关卡
function startGame(level) {
    chooseLevelPage.style.display = 'none'; // 隐藏选关页面
    gameContainer.style.display = 'block';   // 显示游戏界面

    // 初始化游戏关卡，按照关卡加载对应的敌人等内容
    initializeLevel(level);
}

// 初始化关卡内容（例如敌人数量、背景、难度等）
function initializeLevel(level) {
    console.log(`Loading level ${level}`);
    
    // 在这里根据不同关卡设置不同的游戏内容
    if (level === 1) {
        level = 1; // 第一关
        // 初始化第一关的敌人等
    } else if (level === 2) {
        level = 2; // 第二关
        // 初始化第二关的敌人等
    } else if (level === 3) {
        level = 3; // 第三关
        // 初始化第三关的敌人等
    }

    // 可根据关卡设置其他游戏内容
}

// 背景和敌人图像
const enemyImage = new Image();
const backgroundImage = new Image();
enemyImage.src = enemyImagePath;
backgroundImage.src = backgroundImagePath;
const gunImage = new Image();
const gun = new Gun(canvas, 'src/image/gun.png');

let level = 1; 
let score = 0;
const scoreDisplay = document.getElementById('scoreDisplay');
let time = 0; 
const timerDisplay = document.getElementById('timerDisplay');

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
      getShotSound.play();
      enemies.splice(i, 1);
      drawBackground();
      drawEnemies();
      gun.updateGun();
      updateScore();
      checkWinCondition();
      break;
    }
  }
  setTimeout(() => {
    reloadSound.play();
  }, 800);
  canShoot = false;
  reloadDisplayElement.style.display = 'none';
  setTimeout(() => {
    canShoot = true;
  }, 2000);
};

// 生成敌人
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
  gun.updateGun();
  startEnemyMovement();
};

backgroundImage.onerror = () => {
  console.error("Failed to load background image:", backgroundImagePath);
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

function startEnemyMovement() {
  setInterval(() => {
    moveEnemies();
    drawBackground();
    drawEnemies();
    gun.updateGun(); 
  }, 1000 / 60);  
}

function checkWinCondition() {
  if (score >= 10) {  
    showLevelUpMessage();  
    level++;
    resetGame();
  }
}

const reloadDisplayElement = document.createElement('div');
reloadDisplayElement.textContent = 'Reloading';
reloadDisplayElement.style.position = 'absolute';
reloadDisplayElement.style.bottom = '10px';
reloadDisplayElement.style.left = '50%';
reloadDisplayElement.style.transform = 'translateX(-50%)';
reloadDisplayElement.style.fontSize = '30px';
reloadDisplayElement.style.color = 'red';
reloadDisplayElement.style.display = 'none';
document.body.appendChild(reloadDisplayElement);

function showLevelUpMessage() {
  const levelUpMessage = document.createElement('div');
  levelUpMessage.textContent = `Level ${level} Complete!`;
  levelUpMessage.style.position = 'absolute';
  levelUpMessage.style.top = '50%';
  levelUpMessage.style.left = '50%';
  levelUpMessage.style.transform = 'translate(-50%, -50%)';
  levelUpMessage.style.fontSize = '60px';
  levelUpMessage.style.color = 'blue';
  levelUpMessage.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.7)';
  levelUpMessage.style.zIndex = '1000';
  document.body.appendChild(levelUpMessage);

  setTimeout(() => {
    levelUpMessage.style.display = 'none';
  }, 3000);  
}

function resetGame() {
  score = 0;
  enemies.length = 0;  
  drawBackground();
  generateEnemy();
  drawEnemies();
  startEnemyMovement();
}
