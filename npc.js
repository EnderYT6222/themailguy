export class NPC {
  constructor(name, x, y, width = 40, height = 60, color = '#f00') {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.delivered = false;
  }

  draw(ctx) {
    ctx.fillStyle = this.delivered ? '#0a0' : this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.fillText(this.name, this.x, this.y - 5);
  }

  isNear(player) {
    const dx = (this.x + this.width / 2) - (player.x + player.width / 2);
    const dy = (this.y + this.height / 2) - (player.y + player.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 50; // Etkileşim mesafesi
  }
}
