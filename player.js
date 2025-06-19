// player.js
export class Player {
  constructor(x, y, width = 40, height = 60, color = '#0f0') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.speed = 3;
    this.vx = 0;
    this.vy = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Ekran sınırları kontrolü
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > 800) this.x = 800 - this.width;
    if (this.y + this.height > 450) this.y = 450 - this.height;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
