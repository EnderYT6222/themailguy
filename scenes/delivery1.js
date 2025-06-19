// scenes/delivery1.js

export function runDeliveryScene(ctx, onComplete) {
  const dialogue = [
    "[ZİL ÇALAR]",
    "Kapı açılır...",
    "Michael: ...Posta mı?",
    "Sen: Evet... bu size gelmiş.",
    "Michael: ...Ne kadar da nostaljik.",
    "Sen: İyi günler.",
  ];

  let index = 0;

  function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = "22px monospace";
    ctx.fillText(dialogue[index], 50, ctx.canvas.height / 2);
    ctx.fillText("(Tıkla devam etmek için)", 50, ctx.canvas.height / 2 + 40);
  }

  function nextDialogue() {
    index++;
    if (index >= dialogue.length) {
      window.removeEventListener('click', nextDialogue);
      onComplete();
    } else {
      draw();
    }
  }

  function start() {
    draw();
    window.addEventListener('click', nextDialogue);
  }

  start();

  return {
    cleanup() {
      window.removeEventListener('click', nextDialogue);
    }
  };
}
