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
  currentPlayer: 'X',
  gameActive: true,
};

function initGameState() {
  gameState.boardArray = ['', '', '', '', '', '', '', '', ''];
  gameState.currentPlayer = 'X';
  gameState.gameActive = true;
  console.log(gameState);
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

function handleMove() {}
