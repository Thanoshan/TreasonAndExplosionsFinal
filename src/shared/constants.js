module.exports = Object.seal(
  {
  PLAYER_FIRE_COOLDOWN: 0.12,
  PLAYER_RADIUS: 25,
  PLAYER_MAX_HP: 100,
  PLAYER_SPEED: 450,
  BULLET_RADIUS: 3,
  BULLET_SPEED: 925,
  BULLET_DAMAGE: 15,
  SCORE_BULLET_HIT: 1, 

  MAP_SIZE: 3500,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    INPUT: 'input',
    GAME_OVER: 'dead',
    GAME_UPDATE: 'update',
    SHOOT_OUT: 'bang'
  },
});
