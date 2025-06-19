// main.js
import { runIntroScene } from './scenes/intro.js';
import { runDeliveryScene } from './scenes/delivery1.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentScene = null;

function changeScene(newSceneFunc) {
  if (currentScene && currentScene.cleanup) {
    currentScene.cleanup();
  }
  currentScene = newSceneFunc(ctx, () => {
    // Bir sonraki sahneye geçiş
    if (newSceneFunc === runIntroScene) {
      changeScene(runDeliveryScene);
    } else {
      console.log('Oyun bitti veya sonraki sahne yok.');
      // İstersen burada oyunu bitir veya menüye dön
    }
  });
}

window.onload = () => {
  changeScene(runIntroScene);
};
