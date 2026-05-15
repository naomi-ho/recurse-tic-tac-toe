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

const game = document.querySelector('.game');
const restart = document.querySelector('#restart');

restart.addEventListener('click', resetGame);

const gameState = {
  boardArray: [],
  currentPlayer: 'X',
  gameActive: true,
};

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

function startGame() {
  initGameState();
  createBoard();
}

startGame();

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

function placeMark(index, cell, player) {
  gameState.boardArray[index] = player;
  cell.textContent = player;
}

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

function switchTurn() {
  gameState.currentPlayer =
    gameState.currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
}

function endGame(result, player) {
  if (!result) {
    console.log("It's a draw!");
  } else {
    console.log(`Player with ${player} wins!`);
  }
  gameState.gameActive = false;
}

function resetGame() {
  const oldBoard = document.querySelector('.board');
  if (oldBoard) {
    oldBoard.remove();
  }

  startGame();
}
