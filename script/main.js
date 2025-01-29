const scope = document.getElementById('sniper-scope');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const enemyImagePath = 'src/enemy.png';

const enemyImage = new Image();
enemyImage.src = enemyImagePath;

const numEnemies = 10; 


function initenemy(){
  for (let i = 0; i < numEnemies; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.drawImage(enemyImage, x, y);
  }
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


