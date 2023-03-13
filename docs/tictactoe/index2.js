const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameEnded = false;

const resultDiv = document.getElementById('result');
const restartButton = document.getElementById('restart');

function checkWin() {
  const winStates = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ];
  for (let i = 0; i < winStates.length; i++) {
    const [a, b, c] = winStates[i];
    if (board[a] && board[a] == board[b] && board[b] == board[c]) {
      return board[a];
    }
  }
  return null;
}

function checkDraw() {
  return !board.includes('');
}

function playMove(index) {
  if (!gameEnded && board[index] == '') {
    board[index] = currentPlayer;
    drawBoard();
    const winner = checkWin();
    if (winner) {
      resultDiv.innerHTML = `${winner} wins!`;
      gameEnded = true;
      restartButton.style.display = 'block';
    } else if (checkDraw()) {
      resultDiv.innerHTML = 'Game ended in a draw.';
      gameEnded = true;
      restartButton.style.display = 'block';
    } else {
      currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
      if (currentPlayer == 'O') {
        makeAiMove();
      }
    }
  }
}

function makeAiMove() {
  let bestIndex = -1;
  let bestScore = -Infinity;
  for (let i = 0; i < board.length; i++) {
    
  if (board[i] == '') {
    board[i] = 'O';
    const score = minimax(board, false);
    board[i] = '';
    if (score > bestScore) {
      bestIndex = i;
      bestScore = score;
    }
  }
}
playMove(bestIndex);
}


function minimax(board, maximizing) {
const winner = checkWin();
if (winner) {
return winner == 'O' ? 1 : -1;
} else if (checkDraw()) {
return 0;
}
if (maximizing) {
let bestScore = -Infinity;
for (let i = 0; i < board.length; i++) {
if (board[i] == '') {
board[i] = 'O';
const score = minimax(board, false);
board[i] = '';
if (score > bestScore) {
bestScore = score;
}
}
}
return bestScore;
} else {
let bestScore = Infinity;
for (let i = 0; i < board.length; i++) {
if (board[i] == '') {
board[i] = 'X';
const score = minimax(board, true);
board[i] = '';
if (score < bestScore) {
bestScore = score;
}
}
}
return bestScore;
}
}

function drawBoard() {
for (let i = 0; i < board.length; i++) {
document.getElementById(i).innerHTML = board[i];
}
}

function restartGame() {
board.fill('');
currentPlayer = 'X';
gameEnded = false;
resultDiv.innerHTML = '';
drawBoard();
restartButton.style.display = 'none';
}

document.getElementById('board').addEventListener('click', function(event) {
if (event.target.tagName == 'TD') {
const index = event.target.id;
playMove(index);
}
});

restartButton.addEventListener('click', restartGame);

drawBoard();