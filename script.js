// Toggle interactivity off if gameOver
// Add a "next round" button to the pop-up that resets board
// Add a global score keeping count of each player's score (games won)

let gameBoard = [];

function Player(name, value, symbol, score) {
  // Maybe adding getScore, setScore functions?
  return { name, value, symbol, score };
}

const player1 = Player("Player 1", 1, "X", 0);
const player2 = Player("Player 2", 2, "O", 0);

let activePlayer = player1;
let gameOver;

const table = document.querySelector(".gameboard");
const nextRoundBtn = document.querySelector(".next_round");
const modal = document.querySelector(".modal_container");

resetBoard();

function displayPlayers() {
  const display = document.querySelector(".players_display");
  display.textContent = `${activePlayer.name} turn: ${activePlayer.symbol}`;

  const scoreLabel = document.querySelector(".score_label");
  scoreLabel.textContent = `${player1.name}: ${player1.score} - ${player2.name}: ${player2.score}`;
}

displayPlayers();

table.addEventListener("click", (e) => {
  const i = Number(e.target.id.replace("c", ""));
  if (gameBoard[i] === 0) {
    gameBoard[i] = activePlayer.value;
    displaySymbols(i);
    checkWin();
    alternatePlayer();
    displayPlayers();
  }
});

nextRoundBtn.addEventListener("click", () => {
  hideModal();
  resetBoard();
});

// Can't do this this way because it hides the "next round" button. Maybe refactor.
// modal.addEventListener("click", (e) => {
//   const clickInside = document.querySelector(".modal").contains(e.target);
//   if (!clickInside) {
//     hideModal();
//   }
// });

function resetBoard() {
  gameOver = false;
  gameBoard = [];
  for (let i = 0; i < 9; i++) {
    gameBoard.push(0);
  }
  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`c${i}`);
    cell.innerHTML = "";
  }
}

function displaySymbols(i) {
  const cell = document.getElementById(`c${i}`);
  cell.innerHTML = activePlayer.symbol;
}

function alternatePlayer() {
  activePlayer === player1
    ? (activePlayer = player2)
    : (activePlayer = player1);
}

function checkWin() {
  checkRows();
  checkColumns();
  checkDiagonals();
  if (gameOver) {
    const msg = `${activePlayer.name} wins!`;
    showModal(msg);
    activePlayer.score++;
  } else if (!gameBoard.includes(0)) {
    const msg = "It's a tie!";
    showModal(msg);
  }
}

function checkRows() {
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

function checkColumns() {
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

function checkDiagonals() {
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

function showModal(msg) {
  const text = document.querySelector(".winner_label");

  modal.classList.remove("hidden");
  text.textContent = msg;
}

function hideModal() {
  modal.classList.add("hidden");
}

// Revisar si hay 3 símbolos iguales en secuencia:
//      Activar una función que finalice el juego y anuncie al jugador activo como ganador
//      Si no hay secuencia ganadora, revisar si todos los cuadros del tablero están ocupados:
//      Si es así, determinar fin de juego y empate

// ¿Cómo determinar ganador?
// ¿Chequear cada posible combinación? 3 filas, 3 columnas, 2 diagonales
// Revisar cada una por si se repite el mismo símbolo y después determinar qué símbolo es para detectar quién ganó
