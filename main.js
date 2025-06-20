import { Player } from './player.js';
import { NPC } from './npc.js';
import { Dialog } from './dialog.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dialogBox = document.getElementById('dialog-box');

const background = new Image();
background.src = './root/background/town.png';

const player = new Player(100, 100, './root/sprite/player/postman.png');
const npcs = [
  new NPC('Michael', 600, 150, "Hey... Thanks for the letter. I remember you... from before.", './root/sprite/npc/michael.png'),
  new NPC('Boss', 200, 300, "You again? Don’t screw this up.", './root/sprite/npc/boss.png')
];

let currentDeliveryIndex = 0;
const deliveries = ['Michael', 'Boss'];

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
      Dialog.show("Nobody to deliver here. Or you’re too far.");
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
  Dialog.draw();
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


// === npc.js ===
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


// === dialog.js ===
export const Dialog = {
  text: "",
  timer: 0,
  show(msg, duration = 300) {
    this.text = msg;
    this.timer = duration;
    document.getElementById('dialog-box').innerText = msg;
  },
  draw() {
    if (this.timer > 0) {
      this.timer--;
    } else {
      document.getElementById('dialog-box').innerText = "";
    }
  }
};
