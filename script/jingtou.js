export class SniperScope {
    constructor(canvas) {
      this.scope = document.getElementById('sniper-scope');
      this.canvas = canvas;
      this.scopeSize = 80;
      this.targetScopeSize = 80;
      this.isZooming = false;
  
      this.initScope();
    }
  
    initScope() {
      this.scope.style.backgroundImage = 'url("src/jingtou.png")';
      this.scope.style.backgroundSize = 'cover';
      this.scope.style.width = `${this.scopeSize}px`;
      this.scope.style.height = `${this.scopeSize}px`;
  
      document.addEventListener('mousemove', (e) => this.updateScopePosition(e.clientX, e.clientY));
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
        this.scope.style.width = `${this.scopeSize}px`;
        this.scope.style.height = `${this.scopeSize}px`;
  
        requestAnimationFrame(step);
      };
  
      requestAnimationFrame(step);
    }
  
    updateScopePosition(mouseX, mouseY) {
      this.scope.style.left = `${mouseX - this.scopeSize / 2}px`;
      this.scope.style.top = `${mouseY - this.scopeSize / 2}px`;
    }
  }
  