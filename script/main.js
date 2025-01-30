const scope = document.getElementById('sniper-scope');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const enemyImagePath = 'src/enemy.png';

const enemyImage = new Image();
enemyImage.src = enemyImagePath;

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
    enemies.push({
      x: x,
      y: y,
      width: 50,
      height: 50,
      image: enemyImage
    });
  }
}

enemyImage.onload = () => {
  generateEnemy();
  drawEnemies();
};

function drawEnemies() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  enemies.forEach(enemy => {
    ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
  });
}

scope.style.backgroundImage = 'url("src/jingtou.png")';
scope.style.backgroundSize = 'cover'; 
scope.style.width = '100px';  
scope.style.height = '100px'; 

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;


  const scopeSize = 100; 
  scope.style.left = `${mouseX - scopeSize / 2}px`;
  scope.style.top = `${mouseY - scopeSize / 2}px`;
});

canvas.style.cursor = 'none';

canvas.addEventListener('mousedown', function(event) {
  if (event.button === 0) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i]; 

      if (mouseX >= enemy.x && mouseX <= enemy.x + enemy.width &&
          mouseY >= enemy.y && mouseY <= enemy.y + enemy.height) {
        enemies.splice(i, 1); 
        //alert('你击中了一个敌人！');
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

setInterval(updateTimer, 1000);

