import { SniperScope } from './jingtou.js';
import { Gun } from './gun.js';
import { EnemyManager } from './enemy.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 1400;
canvas.height = 800;

const backgroundImagesPath = {
    1: '../src/image/background_1.png',
    2: '../src/image/background_2.jpg',
    3: '../src/image/background_3.png'
};

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
let bullets = 15; 
let canShoot = true;

const gun = new Gun(canvas, 'src/image/gun.png');
const sniperScope = new SniperScope(canvas);
const backgroundImage = new Image();
//backgroundImage.src = backgroundImagePath;
const enemyManager = new EnemyManager('../src/image/enemy.png', canvas);

startButton.addEventListener('click', () => {
    level = 1; // 确保每次进入游戏，默认从第一关开始
    gameCover.style.display = 'none';
    chooseLevelPage.style.display = 'flex';
});


['level-1-button', 'level-2-button', 'level-3-button'].forEach((id, index) => {
    const button = document.getElementById(id);
    
    // 让按钮可以通过 CSS 定位
    button.style.position = 'absolute';
    
    // 设置按钮的默认位置，你可以修改这些值
    const positions = [
        { top: '300px', left: '900px' },
        { top: '600px', left: '700px' },
        { top: '550px', left: '1000px' }
    ];

    button.style.top = positions[index].top;
    button.style.left = positions[index].left;

    // 添加点击事件
    button.addEventListener('click', () => startGame(index + 1));
});


function startGame(selectedLevel) {
    const chooseLevelImage = document.querySelector('.choose-level-page img');
    const levelButtons = document.querySelector('.level-buttons');

    level = selectedLevel;  // 记录当前关卡

    // **切换背景图片**
    backgroundImage.src = backgroundImagesPath[level];
    drawBackground();

    // **让按钮先消失**
    levelButtons.style.display = 'none';

    // **等一会儿再执行放大动画**
    setTimeout(() => {
        chooseLevelImage.classList.add('zoom-out');
    }, 200);

    setTimeout(() => {
        chooseLevelPage.style.display = 'none';
        gameContainer.style.display = 'flex';
        resetGame();
    }, 1500);
}




function resetGame() {
    score = 0;
    bullets = 15; // 重新补满子弹
    updateBulletDisplay();
    enemyManager.resetEnemies();
    enemyManager.startEnemyMovement(ctx, canvas, drawBackground, gun);
    updateScore();
    //drawBackground();
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
    if (!canShoot || bullets <= 0) return;

    bullets--; // 每次射击消耗 1 子弹
    updateBulletDisplay();

    if (bullets === 0) {
        setTimeout(() => gameOver(), 500); // 让子弹归零后稍微延迟一下再 Game Over
        return;
    }

    shootSound.play();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (mouseX - rect.left) * scaleX;
    const y = (mouseY - rect.top) * scaleY;

    if (enemyManager.checkHit(x, y)) {
        getShotSound.play();
        score++;
        updateScore();
        checkWinCondition();
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

function gameOver() {
    alert("Out of bullets! Game Over!");
    gameContainer.style.display = 'none';
    chooseLevelPage.style.display = 'flex';
    chooseLevelPage.classList.remove('blurred');
    resetGame();
}


function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

let unlockedLevels = localStorage.getItem('unlockedLevels') 
    ? JSON.parse(localStorage.getItem('unlockedLevels')) 
    : 1;

function updateLevelButtons() {
    for (let i = 1; i <= 3; i++) {
        const button = document.getElementById(`level-${i}-button`);
        button.disabled = i > unlockedLevels; // 只解锁已通关的关卡
    }
}
    

function checkWinCondition() {
    if (score >= 10) {
        alert(`Level ${level} Complete!`);
        
        if (level < 3) { // 最高解锁到 Level 3
            unlockedLevels = Math.max(unlockedLevels, level + 1);
            localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
        }

        gameContainer.style.display = 'none';
        chooseLevelPage.style.display = 'flex';
        chooseLevelPage.classList.remove('blurred');

        // **重新显示 level 选择按钮**
        document.querySelector('.level-buttons').style.display = 'flex';

        // **重置图片状态，移除 zoom-out 类**
        document.querySelector('.choose-level-page img').classList.remove('zoom-out');

        updateLevelButtons(); // 更新按钮状态
        //resetGame();
    }
}



// 页面加载时恢复解锁状态
updateLevelButtons();


backgroundImage.onload = () => {
    console.log("Background image loaded successfully");
    drawBackground();
    //resetGame();
};

function updateBulletDisplay() {
    bulletDisplay.textContent = `Bullets: ${bullets}`;
}


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

const bulletDisplay = document.createElement('div');
bulletDisplay.id = 'bullet-display';
bulletDisplay.style.position = 'absolute';
bulletDisplay.style.top = '20px';
bulletDisplay.style.right = '50px';
bulletDisplay.style.fontSize = '24px';
bulletDisplay.style.color = 'black';
bulletDisplay.style.fontWeight = 'bold';
document.body.appendChild(bulletDisplay);


