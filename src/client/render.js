import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';

const Constants = require('../shared/constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const board = document.getElementById('game-canvas');
const boardContext = board.getContext('2d');
setCanvasDimensions();

//sets canvas diementions
function setCanvasDimensions() {
  const ratio = Math.max(1, 600 / window.innerWidth);
  board.width = ratio * window.innerWidth;
  board.height = ratio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  const { me, others, bullets } = getCurrentState();
  if (!me) {
    return;
  }

  // Draw background
  renderBackground(me.x, me.y);

  // Draw boundaries
  boardContext.strokeStyle = 'black';
  boardContext.lineWidth = 1;
  boardContext.strokeRect(board.width / 2 - me.x, board.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

  // thano experimental
  bullets.forEach(renderBullet.bind(null, me));

  // Draw all players
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));
}

//this is where the background is rendered. it is a circular gradient black/white
function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + board.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + board.height / 2;

  const gradBackground = boardContext.createRadialGradient(backgroundX, backgroundY, MAP_SIZE / 10, backgroundX, backgroundY, MAP_SIZE / 2,);

  gradBackground.addColorStop(0, 'seagreen');
  gradBackground.addColorStop(1, 'aquamarine');
  boardContext.fillStyle = gradBackground;
  boardContext.fillRect(0, 0, board.width, board.height);
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
  const { x, y, direction } = player;
  const canvasX = board.width / 2 + x - me.x;
  const canvasY = board.height / 2 + y - me.y;


  //this is where the program calculates which colour each player is. it is based on the acsii code of the player ID
 var img;
  
  if(((player.id).charAt(19)).charCodeAt(0) % 6 == 0){
    img = 'ship.svg';
  }
  else if(((player.id).charAt(19)).charCodeAt(0) % 6 == 1){
    img = 'ship1.svg';
  }
  else if(((player.id).charAt(19)).charCodeAt(0) % 6 == 2){
    img = 'ship2.svg';
  }
  else if((((player.id).charAt(19)).charCodeAt(0) % 6 == 3)){
    img = 'ship3.svg';
  }
  else if((((player.id).charAt(19)).charCodeAt(0) % 6 == 5)){
    img = 'ship4.svg';
  }
  else{
    img = 'ship5.svg';
  }

  // Draw ship
  boardContext.save();
  boardContext.translate(canvasX, canvasY);
  boardContext.rotate(direction);
  boardContext.drawImage(getAsset(img), -PLAYER_RADIUS, -PLAYER_RADIUS, PLAYER_RADIUS * 2, PLAYER_RADIUS * 2,);  
  boardContext.restore();

  // Draw health bar
  boardContext.fillStyle = 'white';
  boardContext.fillRect(canvasX - PLAYER_RADIUS, canvasY + PLAYER_RADIUS + 7, PLAYER_RADIUS * 2, 2,);

  //the red sits on top of the white.
  boardContext.fillStyle = 'red';
  boardContext.fillRect(canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP, canvasY + PLAYER_RADIUS + 7, PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP), 2,);
}

//where bullets are drawn
function renderBullet(me, bullet) {
  const { x, y } = bullet;
  boardContext.drawImage(getAsset('bullet.svg'), board.width / 2 + x - me.x - BULLET_RADIUS, board.height / 2 + y - me.y - BULLET_RADIUS, BULLET_RADIUS * 2, BULLET_RADIUS * 2,);
}

//has the background in the background of the main menu
function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
