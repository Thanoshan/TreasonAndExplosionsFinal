const express = require('express');
const webpack = require('webpack');
const socketio = require('socket.io');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack.dev.js');
const Game = require('./game');
const Constants = require('../shared/constants');

// Setup an Express server
const gameInit = express();
gameInit.use(express.static('public'));
const compiler = webpack(webpackConfig);
gameInit.use(webpackDevMiddleware(compiler));

// Listen on port
const port = 5000;
const server = gameInit.listen(port);
console.log(`SERVER START >> SERVER STARTING ON PORT ${port}`);

// Setup socket.io
const connection = socketio(server);

// Listen for socket.io connections
connection.on('connection', socket => 
{
  console.log('PLAYER CONNECTION >> PLAYER CONNECTED WITH ID: ', socket.id);

  socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on(Constants.MSG_TYPES.SHOOT_OUT, shoot);
  socket.on('disconnect', onDisconnect);
});

const game = new Game();

//funtion called whenever a input is detected from a client. passes data to game file
function handleInput(dir) {
  game.handleInput(this, dir);
}

//function called whenever user joins. Passes data to game file
function joinGame(username) {
  game.addPlayer(this, username);
}

//function called whenever shoot is detected, passes it to game file.
function shoot(space){
  game.shoot(this, space);
}

//function called whenever a player disconnections, tells game file to remove the player
function onDisconnect() {
  game.removePlayer(this);
}
