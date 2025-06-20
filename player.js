export class Player {
  constructor(x, y, spritePath) {
    this.x = x;
    this.y = y;
    this.width = 27;
    this.height = 31;
    this.speed = 3;
    this.vx = 0;
    this.vy = 0;
    this.sprite = new Image();
    this.sprite.src = spritePath;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.x = Math.max(0, Math.min(800 - this.width, this.x));
    this.y = Math.max(0, Math.min(450 - this.height, this.y));
  }
  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}
