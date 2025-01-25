// PAGES
const landingPage = document.getElementById('landing-page')
const gamePage = document.getElementById('game-page')
const gameEnd = document.getElementById('game-end')

// ELEMENTS
const playButton = document.getElementById('play-button');
const restartButton = document.getElementById('restart-button')
const gridCells = document.querySelectorAll('#game-page .grid .cell');

// TEXT
const gamePlayText = document.querySelector('#game-page .centered-container:nth-of-type(2) .text')
const gameEndText = document.querySelector('#game-end .text')
const gameEndImg = document.querySelector('#game-end img')

// IMAGES
const naughtImg = 'assets/naught.png';
const crossImg = 'assets/cross.png';

// DATA
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let currentPlayer = 'X';

// FUNCTIONS
function showPage(pageToShow) {
    document.querySelectorAll('.page').forEach((page) => {
      page.classList.remove('active');
    });
  
    pageToShow.classList.add('active');
  }

function handleCellClick(event) {
  const cell = event.target.closest('.cell');

  if (cell.querySelector('img')) {
    return;
  }

  // place marker in the cell
  const marker = document.createElement('img')
  marker.src = currentPlayer === 'X' ? crossImg : naughtImg;
  marker.alt = currentPlayer;
  cell.appendChild(marker);

  // check for win
  const winner = checkWinner();
  if (winner) {
    gameEndText.textContent = `PLAYER ${winner === 'X' ? '1' : '2'}`;
    gameEndImg.src = winner === 'X' ? crossImg : naughtImg;
    showPage(gameEnd)
  }

  // switch to the other player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gamePlayText.textContent = `PLAYER ${currentPlayer === 'X' ? '1' : '2'}'S TURN`;
}

function checkWinner() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    console.log(a, b, c)
    const cellA = gridCells[a].querySelector('img');
    const cellB = gridCells[b].querySelector('img');
    const cellC = gridCells[c].querySelector('img');

    if (cellA && cellB && cellC) {
      if (cellA.alt == cellB.alt && cellB.alt == cellC.alt) {
        return cellA.alt
      }
    }

  }
}

function checkDraw() {
  return [...gridCells].every(cell => cell.querySelector('img'));
}

function resetGame() {
  currentPlayer = 'X'; // Reset to crosses
}

// EVENT LISTENERS
playButton.addEventListener('click', () => {
  showPage(gamePage);
});

restartButton.addEventListener('click', () => {
  showPage(landingPage);
})

gridCells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});