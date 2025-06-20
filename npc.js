export class NPC {
  constructor(name, x, y, dialogue, spritePath) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = 27;
    this.height = 31;
    this.dialogue = dialogue;
    this.sprite = new Image();
    this.sprite.src = spritePath;
    this.delivered = false;
  }
  draw(ctx) {
    ctx.globalAlpha = this.delivered ? 0.5 : 1.0;
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.fillText(this.name, this.x, this.y - 5);
  }
  isNear(player) {
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    return Math.sqrt(dx * dx + dy * dy) < 40;
  }
}
