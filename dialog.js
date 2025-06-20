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
