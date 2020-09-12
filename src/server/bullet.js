const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');

//creates a bullet from the player who shot it
class Bullet extends ObjectClass {
  constructor(parentID, x, y, dir) {
    super(shortid(), x, y, dir, Constants.BULLET_SPEED);
    this.parentID = parentID;
  }

  //updates the position of the bullet
  update(time) {
    super.update(time);
    return this.x < 0 || this.x > Constants.MAP_SIZE || this.y < 0 || this.y > Constants.MAP_SIZE;
  }
}

module.exports = Bullet;
