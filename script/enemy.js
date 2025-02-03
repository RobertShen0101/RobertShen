const enemyImagePath = 'src/image/enemy.png';
const enemyImage = new Image();
enemyImage.src = enemyImagePath;

const numEnemies = 10;
const enemies = [];
const enemySpawnPoints = [
  { x: 100, y: 150 }, { x: 250, y: 300 }, { x: 400, y: 100 },
  { x: 550, y: 350 }, { x: 700, y: 200 }, { x: 850, y: 450 },
  { x: 300, y: 500 }, { x: 500, y: 250 }, { x: 650, y: 400 },
  { x: 800, y: 150 }
];

// 生成敌人
export function generateEnemies() {
  enemies.length = 0; 
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

// 绘制敌人
export function drawEnemies(ctx) {
  enemies.forEach(enemy => {
    if (enemy.image) {
      ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  });
}

// 移动敌人
export function moveEnemies(canvas) {
  enemies.forEach(enemy => {
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    // 碰到边界反弹
    if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
      enemy.speedX *= -1;
    }
    if (enemy.y <= 0 || enemy.y + enemy.height >= canvas.height) {
      enemy.speedY *= -1;
    }
  });
}

// 开始敌人移动
export function startEnemyMovement(ctx, canvas, drawBackground, gun) {
  setInterval(() => {
    moveEnemies(canvas);
    drawBackground();  // 先绘制背景
    drawEnemies(ctx);  // 再绘制敌人
    gun.updateGun();   // 最后绘制枪支
  }, 1000 / 60);
}

// 获取敌人列表
export function getEnemies() {
  return enemies;
}

// 移除敌人
export function removeEnemy(index) {
  enemies.splice(index, 1);
}

// 重置敌人
export function resetEnemies() {
  enemies.length = 0;
  generateEnemies();
}

// 检查是否击中敌人
export function checkHit(x, y) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    if (x >= enemy.x && x <= enemy.x + enemy.width &&
        y >= enemy.y && y <= enemy.y + enemy.height) {
      removeEnemy(i);
      return true;
    }
  }
  return false;
}

// 确保敌人图片加载后生效
enemyImage.onload = () => {
  enemies.forEach(enemy => enemy.image = enemyImage);
};