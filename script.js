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

const gameState = {
  boardArray: [],
  isPlayer_O_Turn: false,
  gameActive: true,
};

function initGameState() {
  gameState.boardArray = ['', '', '', '', '', '', '', '', ''];
  gameState.isPlayer_O_Turn = false;
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
  const currentPlayer = gameState.isPlayer_O_Turn ? PLAYER_O : PLAYER_X;

  // if game isn't active or cell is already filled, return
  if (gameState.gameActive !== true || gameState.boardArray[index] !== '') {
    return;
  }

  // update game state and cell
  placeMark(index, clickedCell, currentPlayer);

  // check for win

  // check for draw

  // switch current player
}

function placeMark(index, clickedCell, currentPlayer) {
  gameState.boardArray[index] = currentPlayer;
  clickedCell.textContent = currentPlayer;
}
