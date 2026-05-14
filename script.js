const game = document.querySelector('.game');

function createBoard() {
  const board = document.createElement('div');
  board.className = 'board';

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement('button');
    cell.className = 'cell';
    cell.dataset.index = i; // dataset.[] adds new data attribute, in this case 'index'
    board.appendChild(cell);
  }
  game.appendChild(board);
}

// start game
createBoard();
