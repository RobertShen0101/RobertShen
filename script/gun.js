export class Gun {
    constructor(canvas, gunImagePath) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.gunImage = new Image();
        this.gunImage.src = gunImagePath;

        this.gunX = canvas.width - 300;
        this.gunY = canvas.height - 200;

        this.mouseX = canvas.width / 2;
        this.mouseY = canvas.height / 2;

        this.gunImage.onload = () => {
            this.updateGun();
        };

        canvas.addEventListener('mousemove', (event) => this.updateMousePosition(event));
    }

    updateMousePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = event.clientX - rect.left;
        this.mouseY = event.clientY - rect.top;
    }

    calculateAngle() {
        const deltaX = this.mouseX - this.gunX;
        const deltaY = this.mouseY - this.gunY;
        return Math.atan2(deltaY, deltaX); 
    }

    calculateDistance() {
        const deltaX = this.mouseX - this.gunX;
        const deltaY = this.mouseY - this.gunY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    calculateScale() {
        const distance = this.calculateDistance();
        const minScale = 0.5; 
        const maxScale = 1.5;  
        const maxDistance = 500;

        const scale = Math.max(minScale, Math.min(maxScale, maxScale - (distance / maxDistance) * (maxScale - minScale)));
        return scale;
    }

    drawGun() {
        this.ctx.save();

        const angle = this.calculateAngle();  
        const scale = this.calculateScale();

        const centerX = this.gunX + this.gunImage.width / 2;
        const centerY = this.gunY + this.gunImage.height / 2;

        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(angle); 
        this.ctx.scale(scale, scale);  

        this.ctx.drawImage(this.gunImage, -this.gunImage.width / 2, -this.gunImage.height / 2);

        this.ctx.restore();
    }

    updateGun() {
        this.drawGun();  
    }
}
