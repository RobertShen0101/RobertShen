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
    
      this.initScope();
    }
    
    initScope() {
      this.scope.style.backgroundImage = 'url("src/image/jingtou.png")';
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
    
    handleMouseDown(event) {
      if (event.button === 2) { 
        event.preventDefault();
        this.targetScopeSize = 200;
        if (!this.isZooming) this.animateScopeSize();
      } else if (event.button === 0) {
        if (this.onShoot) this.onShoot(event.clientX, event.clientY);
      }
    }
    
    handleMouseUp(event) {
      if (event.button === 2) { 
        event.preventDefault();
        this.targetScopeSize = 80;
        if (!this.isZooming) this.animateScopeSize();
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
  
    updateScopePosition(mouseX, mouseY) {
      const offset = this.scopeSize / 2;
      this.scope.style.left = `${mouseX - offset}px`;
      this.scope.style.top = `${mouseY - offset}px`;
    }
  }
  