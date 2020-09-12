import { updateLeaderboard } from './leaderboard';

const gameUpdater = [];
let startGameTime = 0;
const RENDER_DELAY = 100;
let timeStampServerInit = 0;

export function initState() {
  startGameTime = 0;
  timeStampServerInit = 0;
}

//updates the leaderboard
export function processGameUpdate(update) {
  if (!timeStampServerInit) {
    timeStampServerInit = update.t;
    startGameTime = Date.now();
  }
  gameUpdater.push(update);
  updateLeaderboard(update.leaderboard);
  const base = getBaseUpdate();

  if (base > 0) gameUpdater.splice(0, base);  
}

//returns the server time based on system clock
function currentServerTime() {
  return timeStampServerInit + (Date.now() - startGameTime) - RENDER_DELAY;
}

// Returns the index of the base update, the first game update before
// current server time, or -1 if N/A.
function getBaseUpdate() {
  const serverTime = currentServerTime();
  for (let i = gameUpdater.length - 1; i >= 0; i--) {
    if (gameUpdater[i].t <= serverTime) {
      return i;
    }
  }
  return -1;
}

// Returns { me, others, bullets }
export function getCurrentState() {
  if (!timeStampServerInit) {
    return {};
  }

  const base = getBaseUpdate();
  const serverTime = currentServerTime();

  // If base is the most recent update we have, use its state.
  //This section was taken from an online tutorial on game updating and interpolation (advanced stuff)==
  if (base < 0 || base === gameUpdater.length - 1) {
    return gameUpdater[gameUpdater.length - 1];
  } 
  else {
    const baseUpdate = gameUpdater[base];
    const next = gameUpdater[base + 1];
    const mvmtRatio = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);
    return {
      me: interpolateObject(baseUpdate.me, next.me, mvmtRatio),
      others: interpolateObjectArray(baseUpdate.others, next.others, mvmtRatio),
      bullets: interpolateObjectArray(baseUpdate.bullets, next.bullets, mvmtRatio),
    };
  }
}
//Section ends here ==


//Section: This whole section helps the player (object) turn directions smoothly 
// Determines the best way to rotate (cw or ccw) when interpolating a direction. ==
function interpolateObject(object1, object2, mvmtRatio) {
  if (!object2) {
    return object1;
  }

  const interpolation = {};
  Object.keys(object1).forEach(key => {
    if (key === 'direction') {
      interpolation[key] = interpolateDirection(object1[key], object2[key], mvmtRatio);
    } else {
      interpolation[key] = object1[key] + (object2[key] - object1[key]) * mvmtRatio;
    }
  });
  return interpolation;
}

function interpolateObjectArray(setOne, setTwo, mvmtRatio) {
  return setOne.map(o => interpolateObject(o, setTwo.find(o2 => o.id === o2.id), mvmtRatio));
}

function interpolateDirection(a1, a2, mvmtRatio) {
  const mathAbs = Math.abs(a2 - a1);
  if (mathAbs >= Math.PI) {
    // This handles the rotations
    if (a1 > a2) {
      return a1 + (a2 + 2 * Math.PI - a1) * mvmtRatio;
    } else {
      return a1 - (a2 - 2 * Math.PI - a1) * mvmtRatio;
    }
  } else {
    // Normal interp
    return a1 + (a2 - a1) * mvmtRatio;
  }

//Section ends here ==
}
