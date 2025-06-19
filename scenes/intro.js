export function runIntroScene(ctx, onComplete) {
  let timer = 0;
  let message = "Her şey sadece basit bir posta ile başladı...";
  let shown = "";

  let rafId = null;

  function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = "28px monospace";
    ctx.fillText(shown, 50, ctx.canvas.height / 2);
  }

  function update() {
    if (timer < message.length) {
      shown += message[timer];
      timer++;
    } else {
      setTimeout(onComplete, 1500);
      cancelAnimationFrame(rafId);
      return;
    }
  }

  function loop() {
    update();
    draw();
    rafId = requestAnimationFrame(loop);
  }

  loop();

  return {
    cleanup() {
      cancelAnimationFrame(rafId);
    }
  };
}
