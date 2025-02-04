export class SniperScope {
  constructor(canvas) {
      this.scope = document.getElementById('sniper-scope');
      this.canvas = canvas;
      this.scopeSize = 80;
      this.targetScopeSize = 80;
      this.isZooming = false;
      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.onShoot = null;
      this.zoomScale = 1; // 初始缩放倍数
      this.overlay = this.createDarkOverlay(); // 创建遮罩层
      
      this.initScope();
  }

  initScope() {
      this.scope.style.backgroundImage = 'url("../src/image/jingtou.png")';
      this.scope.style.backgroundSize = 'cover';
      this.scope.style.width = `${this.scopeSize}px`;
      this.scope.style.height = `${this.scopeSize}px`;

      document.addEventListener('mousemove', (e) => {
          this.lastMouseX = e.clientX;
          this.lastMouseY = e.clientY;
          this.updateScopePosition(this.lastMouseX, this.lastMouseY);
      });

      this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
      this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));

      document.addEventListener('contextmenu', (event) => event.preventDefault());
      this.canvas.style.cursor = 'none';
  }

  createDarkOverlay() {
      let overlay = document.getElementById('dark-overlay');
      if (!overlay) {
          overlay = document.createElement('div');
          overlay.id = 'dark-overlay';
          overlay.style.position = 'absolute';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100vw';
          overlay.style.height = '100vh';
          overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // 默认遮罩颜色
          overlay.style.pointerEvents = 'none'; // 不影响鼠标操作
          overlay.style.transition = 'opacity 0.3s ease';
          overlay.style.opacity = '0'; // 默认隐藏
          overlay.style.maskImage = 'none'; // 初始不裁剪
          document.body.appendChild(overlay);
      }
      return overlay;
  }

  handleMouseDown(event) {
      if (event.button === 2) { // 右键开镜
          event.preventDefault();
          this.targetScopeSize = 400;
          this.zoomScale = 2; // 放大倍数
          this.overlay.style.opacity = '0.8'; // 显示遮罩
          this.updateOverlayMask(this.lastMouseX, this.lastMouseY);

          if (!this.isZooming) this.animateScopeSize();
          this.zoomGameScreen(true, this.lastMouseX, this.lastMouseY);
      } else if (event.button === 0) { // 左键射击
          if (this.onShoot) this.onShoot(event.clientX, event.clientY);
      }
  }

  handleMouseUp(event) {
      if (event.button === 2) { // 解除开镜
          event.preventDefault();
          this.targetScopeSize = 80;
          this.zoomScale = 1; // 还原缩放
          this.overlay.style.opacity = '0'; // 取消遮罩
          this.overlay.style.maskImage = 'none'; // 移除透明洞口

          if (!this.isZooming) this.animateScopeSize();
          this.zoomGameScreen(false);
      }
  }

  animateScopeSize() {
      this.isZooming = true;

      const step = () => {
          if (Math.abs(this.scopeSize - this.targetScopeSize) < 1) {
              this.scopeSize = this.targetScopeSize;
              this.isZooming = false;
              return;
          }

          this.scopeSize += (this.targetScopeSize - this.scopeSize) * 0.2;
          this.updateScopePosition(this.lastMouseX, this.lastMouseY);

          this.scope.style.width = `${this.scopeSize}px`;
          this.scope.style.height = `${this.scopeSize}px`;

          requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
  }

  zoomGameScreen(isZooming, mouseX = 0, mouseY = 0) {
      if (isZooming) {
          const rect = this.canvas.getBoundingClientRect();
          const relativeX = ((mouseX - rect.left) / rect.width) * 100;
          const relativeY = ((mouseY - rect.top) / rect.height) * 100;

          this.canvas.style.transform = `scale(${this.zoomScale})`;
          this.canvas.style.transformOrigin = `${relativeX}% ${relativeY}%`; // 以鼠标为中心放大
      } else {
          this.canvas.style.transform = `scale(1)`;
      }
  }

  updateOverlayMask(mouseX, mouseY) {
      const size = this.targetScopeSize * 1.2; // 透明洞大小
      this.overlay.style.maskImage = `radial-gradient(circle ${size}px at ${mouseX}px ${mouseY}px, transparent 10%, rgba(0, 0, 0, 0.7) 80%)`;
  }

  updateScopePosition(mouseX, mouseY) {
      const offset = this.scopeSize / 2;
      this.scope.style.left = `${mouseX - offset}px`;
      this.scope.style.top = `${mouseY - offset}px`;
  }
}
