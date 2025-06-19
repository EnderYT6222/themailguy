import { Player } from './player.js';
import { NPC } from './npc.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Player(100, 100);

const npcs = [
  new NPC('Michael', 600, 150),
  new NPC('Patron', 200, 300, 50, 80, '#ff0'),
];

let currentDeliveryIndex = 0;
const deliveries = ['Michael', 'Patron'];

const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;

  if (e.key.toLowerCase() === 'e') {
    // Teslimat kontrolü
    const targetNPC = npcs.find(npc => npc.name.toLowerCase() === deliveries[currentDeliveryIndex].toLowerCase());
    if (targetNPC && targetNPC.isNear(player)) {
      targetNPC.delivered = true;
      console.log(`Posta ${targetNPC.name}'a teslim edildi!`);
      currentDeliveryIndex++;
      if (currentDeliveryIndex >= deliveries.length) {
        alert('Tüm postalar teslim edildi! Görev tamamlandı.');
      } else {
        alert(`Sıradaki teslimat: ${deliveries[currentDeliveryIndex]}`);
      }
    } else {
      alert('Bu NPC doğru teslimat noktası değil veya çok uzaktasın!');
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
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  npcs.forEach(npc => npc.draw(ctx));

  player.draw(ctx);

  ctx.fillStyle = '#0f0';
  ctx.font = '18px monospace';
  ctx.fillText(`Teslimat: ${deliveries[currentDeliveryIndex]}`, 20, 30);
  ctx.fillText(`(E) tuşu ile teslim et`, 20, 60);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
