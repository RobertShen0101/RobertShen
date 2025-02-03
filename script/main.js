import { SniperScope } from './jingtou.js';
import { Gun } from './gun.js';
import { generateEnemies, drawEnemies, startEnemyMovement, checkHit, resetEnemies } from './enemy.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundImagePath = 'src/image/background_1.png';
const shootSound = new Audio('src/music/shoot.mp3');
const reloadSound = new Audio('src/music/reload.mp3');
const getShotSound = new Audio('src/music/getshot.mp3');

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

// 监听开始按钮，进入选关页面
startButton.addEventListener('click', () => {
    gameCover.style.display = 'none';
    chooseLevelPage.style.display = 'flex';
});

// 监听选关按钮
['level-1-button', 'level-2-button', 'level-3-button'].forEach((id, index) => {
    document.getElementById(id).addEventListener('click', () => startGame(index + 1));
});

function startGame(selectedLevel) {
    chooseLevelPage.style.display = 'none';
    gameContainer.style.display = 'flex';  // 确保游戏界面可见
    level = selectedLevel;
    resetGame();
}

function resetGame() {
    console.log("Resetting game...");
    score = 0;
    resetEnemies();
    generateEnemies();  // 确保敌人生成
    startEnemyMovement(ctx, canvas, drawBackground, gun);
    updateScore();
}

// 绘制背景
function drawBackground() {
    if (!backgroundImage.complete) {
        console.log("Background image not loaded yet");
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

// 监听狙击枪开火
sniperScope.onShoot = (mouseX, mouseY) => {
    if (!canShoot) return;

    shootSound.play();
    const rect = canvas.getBoundingClientRect();
    const x = mouseX - rect.left;
    const y = mouseY - rect.top;

    if (checkHit(x, y)) {
        getShotSound.play();
        score++;
        updateScore();
        checkWinCondition();
    }

    canShoot = false;
    setTimeout(() => reloadSound.play(), 800);
    setTimeout(() => canShoot = true, 2000);
};

// 更新分数显示
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// 判断是否通关
function checkWinCondition() {
    if (score >= 10) {
        alert(`Level ${level} Complete!`);
        level++;
        resetGame();
    }
}

// 背景加载完成后启动游戏
backgroundImage.onload = () => {
    console.log("Background image loaded successfully");
    drawBackground();
    resetGame();
};

backgroundImage.onerror = () => {
    console.error("Failed to load background image:", backgroundImagePath);
};