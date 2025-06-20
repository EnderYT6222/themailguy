import { Player } from './player.js';
import { NPC } from './npc.js';
import { Dialog } from './dialog.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = './root/background/town.png';

const player = new Player(100, 100, './root/sprite/player/postman.png');
const npcs = [
  new NPC('Michael', 600, 150, "Hey... Thanks for the letter. I remember you... from before.", './root/sprite/npc/michael.png'),
  new NPC('Patron', 200, 300, "You again? Don't screw it up this time.", './root/sprite/npc/patron.png'),
];

let currentDeliveryIndex = 0;
const deliveries = ['Michael', 'Patron'];

const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;

  if (e.key.toLowerCase() === 'e') {
    const targetNPC = npcs.find(npc => npc.name.toLowerCase() === deliveries[currentDeliveryIndex].toLowerCase());
    if (targetNPC && targetNPC.isNear(player)) {
      if (!targetNPC.delivered) {
        targetNPC.delivered = true;
        Dialog.show(targetNPC.dialogue);
        currentDeliveryIndex++;
        if (currentDeliveryIndex >= deliveries.length) {
          Dialog.show("All letters delivered. Something feels... off.");
        } else {
          Dialog.show("Next delivery: " + deliveries[currentDeliveryIndex]);
        }
      }
    } else {
      Dialog.show("No one here to deliver to, or you're too far.");
    }
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function update() {
  player.vx = 0;
  player.vy = 0;

  if (keys['arrowleft'] || keys['a']) player.vx = -player.speed;
  if (keys['arrowright'] || keys['d']) player.vx = player.speed;
  if (keys['arrowup'] || keys['w']) player.vy = -player.speed;
  if (keys['arrowdown'] || keys['s']) player.vy = player.speed;

  player.update();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  npcs.forEach(npc => npc.draw(ctx));
  player.draw(ctx);
  Dialog.draw(ctx);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();


// === player.js ===
export class Player {
  constructor(x, y, spritePath) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 60;
    this.speed = 3;
    this.vx = 0;
    this.vy = 0;
    this.sprite = new Image();
    this.sprite.src = spritePath;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > 800) this.x = 800 - this.width;
    if (this.y + this.height > 450) this.y = 450 - this.height;
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}


// === npc.js ===
export class NPC {
  constructor(name, x, y, dialogue, spritePath, width = 40, height = 60) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dialogue = dialogue;
    this.delivered = false;
    this.sprite = new Image();
    this.sprite.src = spritePath;
  }

  draw(ctx) {
    ctx.globalAlpha = this.delivered ? 0.5 : 1.0;
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#fff';
    ctx.font = '14px monospace';
    ctx.fillText(this.name, this.x, this.y - 10);
  }

  isNear(player) {
    const dx = (this.x + this.width / 2) - (player.x + player.width / 2);
    const dy = (this.y + this.height / 2) - (player.y + player.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 60;
  }
}


// === dialog.js ===
export const Dialog = {
  text: "",
  timer: 0,

  show(msg, duration = 300) {
    this.text = msg;
    this.timer = duration;
  },

  draw(ctx) {
    if (this.timer > 0) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(20, 380, 760, 50);
      ctx.fillStyle = '#fff';
      ctx.font = '18px monospace';
      ctx.fillText(this.text, 30, 410);
      this.timer--;
    }
  }
};
