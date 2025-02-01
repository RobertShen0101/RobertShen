export class Gun {
    constructor(canvas, gunImagePath) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.gunImage = new Image();
        this.gunImage.src = gunImagePath;

        this.baseGunX = canvas.width - 300; 
        this.baseGunY = canvas.height - 200; 

        this.gunX = this.baseGunX;
        this.gunY = this.baseGunY;

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

        this.gunX = this.mouseX;

        this.gunY = this.baseGunY + (this.mouseY - this.canvas.height / 2) * 0.2;

        this.updateGun();
    }

    drawGun() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        this.ctx.save();

        this.ctx.drawImage(this.gunImage, this.gunX, this.gunY);

        this.ctx.restore();
    }

    updateGun() {
        this.drawGun();
    }
}
