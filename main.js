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
