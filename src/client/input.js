import { updateDirection, shootOut } from './networking';
const Bullet = require('../server/bullet');
const Constants = require('../shared/constants');
const Player = require('../server/player');
var keycode = require('keycode');
var timer = 0;

var movement = {
  up: false,
  down: false,
  left: false, 
  right: false,
  space: false
}

//checks if a key is pressed
document.addEventListener('keydown', function(event) {
  switch(event.keyCode){
    case 65:
      movement.left = true;
    case 68: //D
      movement.right = true;
    case 87: //W
      movement.up = true;
    case 83: //S
      movement.down = true; 
    case 32: //space
      movement.space = true;
  }
})

//checks if key is unpressed
document.addEventListener('keyup', function(event) {
  switch(event.keyCode){
    case 65: //A
      movement.left = false;
    case 68: //D
      movement.right = false;
    case 87: //W
      movement.up = false;
    case 83: //S
      movement.down = false;
    case 32:
      movement.space = false;
  }
})

//is called constantly. sends out commands depending on key pressed
function onMouseInput(e) {
    if(movement.left == true){
      handleInput(-10, 0); 
    }
    else if(movement.right == true){
      handleInput(10, 0);
    }
    else if(movement.up == true){
      handleInput(0 , 10);
    }
    else if(movement.down == true){
      handleInput(0 , -10);
    }
    if(movement.space == true){
      shoot(1);
    }
    else{
      shoot(0);
    }
}

//sends the direction in which the player moves
function handleInput(x, y) {
  const dir = Math.atan2(x, y);
  updateDirection(dir);
}

function shoot(space){
  shootOut(space);
}

//this function starts the capture of input
export function startCapturingInput() {
  window.addEventListener('keydown', onMouseInput);
}

//this function stops the capture of input
export function stopCapturingInput() {
  window.removeEventListener('keydown', onMouseInput);
}