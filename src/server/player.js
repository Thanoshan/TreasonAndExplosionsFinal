const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');

var kill = 0;

class Player extends ObjectClass {
  constructor(id, playername, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = playername;
    this.hp = Constants.PLAYER_MAX_HP;
    this.gunCooldown = 0;
    this.score = 0;
  }


  update(time) {
  // Checks if a new bullet needs to be created, then creates it.
    super.update(time);
  //Updates score
    this.score += time * kill;
    kill = 0;
    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    // Fires the Bullet
    this.gunCooldown -= time;
    if (this.gunCooldown <= 0) {
      this.gunCooldown += Constants.PLAYER_FIRE_COOLDOWN;      
      return new Bullet(this.id, this.x, this.y, this.direction);        
    }
    return null;
  }

  //if player is hit, damage applied to player's health
  takeBulletDamage() {
    this.hp -= Constants.BULLET_DAMAGE; //subtracts bullet damage
  }

  //this is where the player gets points for hurting an enemy. Points are based on how much damage given to enemy
  onKill(){
    kill = 1;
    this.score += kill;
  }

  
  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
    };
  }
}

module.exports = Player;
