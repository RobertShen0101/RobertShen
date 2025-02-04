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
});

['level-1-button', 'level-2-button', 'level-3-button'].forEach((id, index) => {
    document.getElementById(id).addEventListener('click', () => startGame(index + 1));
});

function startGame(selectedLevel) {
    chooseLevelPage.style.display = 'none';
    gameContainer.style.display = 'flex';
    level = selectedLevel;
    resetGame();
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
    if (!canShoot) return;
    shootSound.play();
    const rect = canvas.getBoundingClientRect();
    const x = mouseX - rect.left;
    const y = mouseY - rect.top;

    if (enemyManager.checkHit(x, y)) {
        getShotSound.play();
        score++;
        updateScore();
        checkWinCondition();
    }

    canShoot = false;
    setTimeout(() => reloadSound.play(), 800);
    setTimeout(() => canShoot = true, 2000);
};

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function checkWinCondition() {
    if (score >= 10) {
        alert(`Level ${level} Complete!`);
        level++;
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