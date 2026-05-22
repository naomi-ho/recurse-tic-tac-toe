// 1. CONSTANTS
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 2. DOM SELECTIONS
const game = document.querySelector('.game');
const restart = document.querySelector('#restart');
const message = document.querySelector('#message');

// 3. STATE
const gameState = {
  boardArray: [],
  currentPlayer: 'X',
  gameActive: true,
};

// 4. SETUP & RESET FUNCTIONS
function initGameState() {
  gameState.boardArray = ['', '', '', '', '', '', '', '', ''];
  gameState.currentPlayer = 'X';
  gameState.gameActive = true;
}

function createBoard() {
  const board = document.createElement('div');
  board.className = 'board';

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement('button');
    cell.className = 'cell';
    cell.dataset.index = i; // dataset.[] adds new data attribute, in this case 'index'
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
  }
  game.appendChild(board);
}

function resetGame() {
  const oldBoard = document.querySelector('.board');
  if (oldBoard) {
    oldBoard.remove();
  }

  startGame();
}

// 5. PURE GAME LOGIC FUNCTIONS (no side effects on DOM)
function checkWin(board, player) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return board[index] === player;
    });
  });
}

function checkDraw() {
  return gameState.boardArray.every((cell) => cell !== '');
}

// 6. UI UPDATE FUNCTIONS (modify DOM based on game state)
function placeMark(index, cell, player) {
  gameState.boardArray[index] = player;
  cell.textContent = player;
}

function switchTurn() {
  gameState.currentPlayer =
    gameState.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  message.textContent = `Player ${gameState.currentPlayer}'s Turn`;
}

function endGame(isWin, player) {
  if (isWin) {
    message.textContent = `Player ${player} wins!`;
  } else {
    message.textContent = 'Nobody wins. Try again!';
  }
  gameState.gameActive = false;
  message.className = 'flashing-text';
}

// 7. CORE EVENT HANDLER
function handleMove(e) {
  // get clicked cell index
  const clickedCell = e.target;
  const index = clickedCell.dataset.index;

  // determine current player
  const currentPlayer = gameState.currentPlayer;

  // prevents multiple moves on the same cell
  if (gameState.gameActive !== true || gameState.boardArray[index] !== '') {
    return;
  }

  // update game state and cell
  placeMark(index, clickedCell, currentPlayer);

  // check for win or draw. otherwise, switch turns.
  if (checkWin(gameState.boardArray, currentPlayer)) {
    endGame(true, currentPlayer);
  } else if (checkDraw()) {
    endGame(false, currentPlayer);
  } else {
    switchTurn();
  }
}

// 8. ORCHESTRATION
function startGame() {
  initGameState();
  createBoard();

  message.classList.remove('flashing-text');
  message.textContent = `Player ${gameState.currentPlayer}'s Turn`;
}

// 9. EVENT LISTENERS
restart.addEventListener('click', resetGame);

// 10. START THE GAME
startGame();
