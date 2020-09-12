const Constants = require('../shared/constants');

class Object {
  constructor(playerid, playerx, playery, playerdir, playerspeed, playerb) {
    this.id = playerid;
    this.x = playerx;
    this.y = playery;
    this.direction = playerdir;
    this.speed = playerspeed;
    this.shoot = playerb;
  }

  //this is where the direction of the player is sent to, and is applied here. Moves the player in given direction
  update(time) {
    this.x += time * this.speed * Math.sin(this.direction);
    this.y -= time * this.speed * Math.cos(this.direction);
  }

  //finds the distance between an objeCT and a player, usually a bullet
  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  //this is where the direction of the player is going is sent to, then adds it to a variable
  setDirection(dir) {
    this.direction = dir;
  }

  //shooting on demand
  setShootOnce(space){
    this.shoot = space;
  }

  //updates all changed values
  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      b: this.shoot,
    };
  }
}

module.exports = Object;
