const scope = document.getElementById('sniper-scope');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const enemyImagePath = 'src/enemy.png';

const backgroundImagePath = 'src/background_1.png';

const enemyImage = new Image();
const backgroundImage = new Image();
enemyImage.src = enemyImagePath;
backgroundImage.src = backgroundImagePath;

let score = 0;
const scoreDisplay = document.getElementById('scoreDisplay');

let time = 0; 
const timerDisplay = document.getElementById('timerDisplay');

const numEnemies = 10; 
const enemies = []; 

function generateEnemy() {
  for (let i = 0; i < numEnemies; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 2; 
    const speedY = (Math.random() - 0.5) * 2;
    enemies.push({
      x: x,
      y: y,
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

scope.style.backgroundImage = 'url("src/jingtou.png")';
scope.style.backgroundSize = 'cover'; 
scope.style.width = '100px';  
scope.style.height = '100px'; 

let scopeSize = 100;

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  scope.style.left = `${mouseX - scopeSize / 2}px`;
  scope.style.top = `${mouseY - scopeSize / 2}px`;
});

canvas.addEventListener('mouseup', function(event) {
  if (event.button === 2) { 
    event.preventDefault();
    scope.style.width = '100px';
    scope.style.height = '100px';
    scope.style.backgroundSize = 'cover'; 
    scopeSize = 100;
  }
});

canvas.style.cursor = 'none';

canvas.addEventListener('mousedown', function(event) {
  if (event.button === 2) { 
    event.preventDefault();
    scope.style.width = '200px';
    scope.style.height = '200px';
    scopeSize = 200;
    scope.style.backgroundSize = 'cover';  
  }
  if (event.button === 0) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i]; 

      if (mouseX >= enemy.x && mouseX <= enemy.x + enemy.width &&
          mouseY >= enemy.y && mouseY <= enemy.y + enemy.height) {
        enemies.splice(i, 1); 
        drawBackground();
        drawEnemies(); 
        updateScore(); 
        break;
      }
    }
  }
});

function updateScore() {
  score = score + 1;
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
  }, 1000 / 60);  
}

setInterval(updateTimer, 1000);

