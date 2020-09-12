import escape from 'lodash/escape';

const scoreBoard = document.getElementById('leaderboard');
const scoreRows = document.querySelectorAll('#leaderboard table tr');

//updates the scoreboard
export function updateLeaderboard(data) {
  for (let i = 0; i < data.length; i++) {
    scoreRows[i + 1].innerHTML = `<td>${ (i + 1) }</td> <td>${escape(data[i].username.slice(0, 15)) || 'LoserWithNoName'}</td><td>${
      data[i].score
    }</td>`;
  }
  for (let i = data.length; i < 5; i++) {
    scoreRows[i + 1].innerHTML = '<td>-</td><td>-</td><td>-</td>';
  }
}

//removes player from scoreboard
export function setLeaderboardHidden(hidden) {
  if (hidden) {
    scoreBoard.classList.add('hidden');
  } else {
    scoreBoard.classList.remove('hidden');
  }
}
