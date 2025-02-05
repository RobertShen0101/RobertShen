export class EnemyManager {
  constructor(enemyImagePath, canvas) {
    this.enemyImage = new Image();
    this.enemyImage.src = enemyImagePath;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.numEnemies = 10;
    this.enemies = [];
    this.enemySpawnPoints = [
      { x: 100, y: 150 }, { x: 250, y: 300 }, { x: 400, y: 100 },
      { x: 550, y: 350 }, { x: 700, y: 200 }, { x: 850, y: 450 },
      { x: 300, y: 500 }, { x: 500, y: 250 }, { x: 650, y: 400 },
      { x: 800, y: 150 }
    ];
    
    this.enemyImage.onload = () => {
      this.enemies.forEach(enemy => enemy.image = this.enemyImage);
    };
  }

  generateEnemies() {
    this.enemies.length = 0;
    for (let i = 0; i < this.numEnemies; i++) {
      const spawnPoint = this.enemySpawnPoints[i % this.enemySpawnPoints.length];
      const speedX = (Math.random() - 0.5) * 2;
      const speedY = (Math.random() - 0.5) * 2;
      this.enemies.push({
        x: spawnPoint.x,
        y: spawnPoint.y,
        width: 80,
        height: 80,
        image: this.enemyImage,
        speedX: speedX,
        speedY: speedY
      });
    }
  }

  drawEnemies() {
    this.enemies.forEach(enemy => {
      if (enemy.image) {
        this.ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
      }
    });
  }

  moveEnemies() {
    this.enemies.forEach(enemy => {
      enemy.x += enemy.speedX;
      enemy.y += enemy.speedY;

      if (enemy.x <= 0 || enemy.x + enemy.width >= this.canvas.width) {
        enemy.speedX *= -1;
      }
      if (enemy.y <= 0 || enemy.y + enemy.height >= this.canvas.height) {
        enemy.speedY *= -1;
      }
    });
  }

  startEnemyMovement(ctx, canvas, drawBackground, gun) {
    setInterval(() => {
      this.moveEnemies();
      drawBackground();
      this.drawEnemies();
      gun.updateGun();
    }, 1000 / 60);
  }

  checkHit(x, y) {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      console.log(`Checking hit at (${x}, ${y}) against enemy at (${enemy.x}, ${enemy.y})`);
      if (x >= enemy.x && x <= enemy.x + enemy.width &&
          y >= enemy.y && y <= enemy.y + enemy.height) {
        this.removeEnemy(i);
        return true;
      }
    }
    return false;
  }

  removeEnemy(index) {
    this.enemies.splice(index, 1);
  }

  resetEnemies() {
    this.enemies.length = 0;
    this.generateEnemies();
  }
}
