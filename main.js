import { Player } from './player.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Player(100, 100);

const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

function update() {
  // Hareket komutları
  player.vx = 0;
  player.vy = 0;

  if (keys['ArrowLeft'] || keys['a']) player.vx = -player.speed;
  if (keys['ArrowRight'] || keys['d']) player.vx = player.speed;
  if (keys['ArrowUp'] || keys['w']) player.vy = -player.speed;
  if (keys['ArrowDown'] || keys['s']) player.vy = player.speed;

  player.update();
}

function draw() {
  // Arka plan
  ctx.fillStyle = '#000'; // siyah
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Player
  player.draw(ctx);

  // İstersen HUD veya başka objeler buraya
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
