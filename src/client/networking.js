import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

const Constants = require('../shared/constants');

//Opens a socket to the server
const clientSocket = io(`ws://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
  clientSocket.on('connect', () => {
    console.log('SERVER CONNECT >> USER CONNECTED TO SERVER - SOCKET OPEN SUCCESS');
    resolve();
  });
});

//Handles disconnect and game ending. 
export const connect = onGameOver => (
  connectedPromise.then(() => {
    // Register callbacks
    clientSocket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    clientSocket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    clientSocket.on('disconnect', () => {
      console.log('SERVER DISCONNECT >> USER DISCONNECTED FROM SERVER');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    });
  })
);

//Sends username information as type join game to the server
export const play = username => {
  clientSocket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
};

//Sends shoot out messages to the server
export const shootOut = space => {
  clientSocket.emit(Constants.MSG_TYPES.SHOOT_OUT, space);
};

//Sends direction data to the server when thers a change in data
export const updateDirection = throttle(20, dir => {
  clientSocket.emit(Constants.MSG_TYPES.INPUT, dir);
});


