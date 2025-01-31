export class Gun {
    constructor(canvas, gunImagePath) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
  
      this.gunImage = new Image();
      this.gunImage.src = gunImagePath;
  
      this.gunWidth = 100;  // 假设枪的宽度为 100，根据实际情况调整
      this.gunHeight = 50;  // 假设枪的高度为 50，根据实际情况调整
  
      this.mouseX = canvas.width / 2; 
      this.mouseY = canvas.height / 2;
  
      this.gunImage.onload = () => {
        this.updateGun();  // 图片加载完后更新显示
      };

      canvas.addEventListener('mousemove', (event) => this.updateMousePosition(event));  // 监听鼠标移动
    }
  
    // 更新鼠标位置
    updateMousePosition(event) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    }
  
    // 计算枪口角度
    calculateAngle() {
      const deltaX = this.mouseX - this.gunX;
      const deltaY = this.mouseY - this.gunY;
      return Math.atan2(deltaY, deltaX);  // 返回鼠标与枪之间的角度
    }
  
    // 计算枪的缩放比例
    calculateScale() {
      return 1 + (this.canvas.height - this.mouseY) * 0.0008;  // 根据鼠标的位置调整缩放比例
    }
  
    // 绘制枪
    drawGun() {
      this.ctx.save();
  
      const angle = this.calculateAngle();  // 获取当前角度
      const scale = this.calculateScale();  // 获取当前缩放比例

      // 计算枪的右下角位置
      const offsetX = this.mouseX;
      const offsetY = this.mouseY;

      // 计算旋转和缩放后，左上角的位置
      const gunLeftTopX = offsetX - this.gunWidth * scale;
      const gunLeftTopY = offsetY - this.gunHeight * scale;

      // 平移到枪的右下角并旋转
      this.ctx.translate(gunLeftTopX + this.gunWidth * scale, gunLeftTopY + this.gunHeight * scale);
      this.ctx.rotate(angle);
      this.ctx.scale(scale, scale);

      // 绘制枪，注意位置是相对于左上角
      this.ctx.drawImage(this.gunImage, -this.gunWidth, -this.gunHeight);

      this.ctx.restore();
    }

    // 更新枪的显示
    updateGun() {
      this.drawGun();  // 调用绘制方法
    }
}
