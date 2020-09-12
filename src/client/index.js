import { initState } from './state';
import { downloadAssets } from './assets';
import { connect, play } from './networking';
import { startRendering, stopRendering } from './render';
import { setLeaderboardHidden } from './leaderboard';
import { startCapturingInput, stopCapturingInput } from './input';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

const startMenu = document.getElementById('play-menu');
const startButton = document.getElementById('play-button');
const inValue = document.getElementById('username-input');

//executes game start functionality when the start button is clicked
Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {
  startMenu.classList.remove('hidden');
  inValue.focus();
  startButton.onclick = () => {
    play(inValue.value);
    startMenu.classList.add('hidden');
    initState();
    startCapturingInput();
    startRendering();
    setLeaderboardHidden(false);
  };
}).catch(console.error);

//executes when the game is over, stops capturing input
function onGameOver() {
  stopCapturingInput();
  stopRendering();
  startMenu.classList.remove('hidden');
  setLeaderboardHidden(true);
}
