import { SniperScope } from './jingtou.js';
import { Gun } from './gun.js';
import { EnemyManager } from './enemy.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 1400;
canvas.height = 800;

const backgroundImagePath = '../src/image/background_1.png';
const shootSound = new Audio('../src/music/shoot.mp3');
const reloadSound = new Audio('../src/music/reload.mp3');
const getShotSound = new Audio('../src/music/getshot.mp3');

const chooseLevelPage = document.getElementById('choose-level-page');
const gameContainer = document.querySelector('.game-container');
const gameCover = document.getElementById('game-cover');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');

let level = 1;
let score = 0;
let canShoot = true;

const gun = new Gun(canvas, 'src/image/gun.png');
const sniperScope = new SniperScope(canvas);
const backgroundImage = new Image();
backgroundImage.src = backgroundImagePath;
const enemyManager = new EnemyManager('../src/image/enemy.png', canvas);

startButton.addEventListener('click', () => {
    gameCover.style.display = 'none';
    chooseLevelPage.style.display = 'flex';

    // **确保图片恢复原始状态**
    const levelImage = document.querySelector('.choose-level-page img');
    levelImage.style.transform = 'scale(1)';  // 还原初始大小
});

['level-1-button', 'level-2-button', 'level-3-button'].forEach((id, index) => {
    const button = document.getElementById(id);
    
    // 让按钮可以通过 CSS 定位
    button.style.position = 'absolute';
    
    // 设置按钮的默认位置，你可以修改这些值
    const positions = [
        { top: '200px', left: '500px' },
        { top: '400px', left: '600px' },
        { top: '600px', left: '700px' }
    ];

    button.style.top = positions[index].top;
    button.style.left = positions[index].left;

    // 添加点击事件
    button.addEventListener('click', () => startGame(index + 1));
});


function startGame(selectedLevel) {
    const levelImage = document.querySelector('.choose-level-page img');

    // **1. 先执行图片放大**
    levelImage.style.transition = 'transform 1.5s ease';  // 添加动画
    levelImage.style.transform = 'scale(1.5)';

    // **2. 延迟触发背景虚化**
    setTimeout(() => {
        chooseLevelPage.classList.add('blurred');  // 启动背景虚化
    }, 500); // 等图片开始放大后再虚化

    // **3. 等动画完成后切换到游戏页面**
    setTimeout(() => {
        chooseLevelPage.style.display = 'none';
        gameContainer.style.display = 'flex';
        level = selectedLevel;
        resetGame();
    }, 1000); // 1.5秒后进入游戏界面
}

function resetGame() {
    console.log("Resetting game...");
    score = 0;
    enemyManager.resetEnemies();
    enemyManager.startEnemyMovement(ctx, canvas, drawBackground, gun);
    updateScore();
}

function drawBackground() {
    if (backgroundImage.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
        console.log("Background image not loaded yet");
    }
}

sniperScope.onShoot = (mouseX, mouseY) => {
    console.log("Shot fired at:", mouseX, mouseY); // 调试日志
    if (!canShoot) return;

    shootSound.play();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (mouseX - rect.left) * scaleX;
    const y = (mouseY - rect.top) * scaleY;

    if (enemyManager.checkHit(x, y)) {
        console.log("Enemy hit!");
        getShotSound.play();
        score++;
        updateScore();
        checkWinCondition();
    } else {
        console.log("Missed shot.");
    }

    canShoot = false;
    reloadingText.textContent = "Reloading...";
    reloadingText.style.display = 'block';
    setTimeout(() => reloadSound.play(), 800);
    setTimeout(() => {
        canShoot = true;
        reloadingText.style.display = 'none';
    }, 2000);
};

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function checkWinCondition() {
    if (score >= 10) {
        alert(`Level ${level} Complete!`);
        level++;
        gameContainer.style.display = 'none';
        chooseLevelPage.style.display = 'flex';
        chooseLevelPage.classList.remove('blurred'); // 清除虚化
        resetGame();
    }
}

backgroundImage.onload = () => {
    console.log("Background image loaded successfully");
    drawBackground();
    resetGame();
};

backgroundImage.onerror = () => {
    console.error("Failed to load background image:", backgroundImagePath);
};

let reloadingText = document.getElementById('reloading-text');
if (!reloadingText) {
    reloadingText = document.createElement('div');
    reloadingText.id = 'reloading-text';
    reloadingText.style.position = 'absolute';
    reloadingText.style.bottom = '20px';
    reloadingText.style.left = '50%';
    reloadingText.style.transform = 'translateX(-50%)';
    reloadingText.style.color = 'red';
    reloadingText.style.fontSize = '24px';
    reloadingText.style.fontWeight = 'bold';
    reloadingText.style.display = 'none';
    document.body.appendChild(reloadingText);
}
