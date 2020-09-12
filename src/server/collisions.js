const Constants = require('../shared/constants');

//applys the collisions to collided bullets, returns all the collided bullets
function applyCollisions(players, bullets) {
  const collidedBullets = [];
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < players.length; j++) {
      const currentBullet = bullets[i];
      const currentPlayer = players[j];
      if (currentBullet.parentID !== currentPlayer.id && currentPlayer.distanceTo(currentBullet) <= Constants.PLAYER_RADIUS + Constants.BULLET_RADIUS) 
      {
        collidedBullets.push(currentBullet);
        currentPlayer.takeBulletDamage();
        break;
      }
    }
  }
  return collidedBullets;
}

module.exports = applyCollisions;
