function Player(name, value, symbol, score) {
  function getScore() {
    return score;
  }
  function setScore() {
    score++;
  }
  return { name, value, symbol, getScore, setScore };
}

const player1 = Player("Player 1", 1, "X", 0);
const player2 = Player("Player 2", 2, "O", 0);

let gameBoard = [];
let activePlayer = player1;

const table = document.querySelector(".gameboard");
table.addEventListener("click", (e) => {
  const i = Number(e.target.id.replace("c", ""));
  if (gameBoard[i] === 0) {
    gameplayHandler.playTurn(i);
  }
});

const gameplayHandler = (function () {
  let gameOver = false;
  const modal = document.querySelector(".modal_container");
  const nextRoundBtn = document.querySelector(".next_round");

  function _displayPlayers() {
    const display = document.querySelector(".players_display");
    display.textContent = `${activePlayer.name} turn: ${activePlayer.symbol}`;
  }

  function _displayScore() {
    const scoreLabel = document.querySelector(".score_label");
    scoreLabel.textContent = `${player1.name}: ${player1.getScore()} - ${
      player2.name
    }: ${player2.getScore()}`;
  }

  function _alternatePlayer() {
    activePlayer === player1
      ? (activePlayer = player2)
      : (activePlayer = player1);
  }

  function playTurn(i) {
    gameBoard[i] = activePlayer.value;
    _displaySymbols(i);
    _checkWin();
    _alternatePlayer();
    _displayPlayers();
  }

  function _checkWin() {
    _checkRows();
    _checkColumns();
    _checkDiagonals();
    if (gameOver) {
      const msg = `${activePlayer.name} wins!`;
      _showModal(msg);
      activePlayer.setScore();
    } else if (!gameBoard.includes(0)) {
      const msg = "IT'S A TIE!";
      _showModal(msg);
    }
  }

  function _checkRows() {
    for (let i = 0; i < 9; i += 3) {
      if (
        gameBoard[i] > 0 &&
        gameBoard[i] == gameBoard[i + 1] &&
        gameBoard[i] == gameBoard[i + 2]
      ) {
        gameOver = true;
      }
    }
  }

  function _checkColumns() {
    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[i] > 0 &&
        gameBoard[i] == gameBoard[i + 3] &&
        gameBoard[i] == gameBoard[i + 6]
      ) {
        gameOver = true;
      }
    }
  }

  function _checkDiagonals() {
    if (
      (gameBoard[0] > 0 &&
        gameBoard[0] == gameBoard[4] &&
        gameBoard[0] == gameBoard[8]) ||
      (gameBoard[2] > 0 &&
        gameBoard[2] == gameBoard[4] &&
        gameBoard[2] == gameBoard[6])
    ) {
      gameOver = true;
    }
  }

  function _showModal(msg) {
    const text = document.querySelector(".winner_label");

    modal.classList.remove("hidden");
    text.textContent = msg;
  }

  function _hideModal() {
    modal.classList.add("hidden");
  }

  function _displaySymbols(i) {
    const cell = document.getElementById(`c${i}`);
    const symbol = activePlayer.symbol;
    cell.innerHTML = symbol;
    cell.classList.add(`${symbol}`);
  }

  nextRoundBtn.addEventListener("click", () => {
    _hideModal();
    _resetBoard();
  });

  function _resetBoard() {
    gameOver = false;
    gameBoard = [];

    for (let i = 0; i < 9; i++) {
      gameBoard.push(0);
    }

    for (let i = 0; i < 9; i++) {
      const cell = document.getElementById(`c${i}`);
      cell.classList.remove("X", "O");
      cell.innerHTML = "";
    }
    _displayScore();
  }

  _resetBoard();
  _displayScore();

  return { playTurn };
})();
