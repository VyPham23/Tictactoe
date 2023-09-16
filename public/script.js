const board = document.getElementById("board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
let gameOver = false;
const cells = Array.from({ length: 9 });

// Initialize the game board
cells.forEach((cell, index) => {
    cells[index] = document.createElement("div");
    cells[index].classList.add("cell");
    cells[index].addEventListener("click", () => handleCellClick(index));
    board.appendChild(cells[index]);
});

function handleCellClick(index) {
    if (gameOver || cells[index].textContent !== "") return;

    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer} wins!`;
        gameOver = true;
    } else if (cells.every((cell) => cell.textContent !== "")) {
        message.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Current player: ${currentPlayer}`;
    }
}

function checkWin(player) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombos.some((combo) => {
        return combo.every((index) => cells[index].classList.contains(player));
    });
}

restartButton.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });

    currentPlayer = "X";
    gameOver = false;
    message.textContent = "Current player: X";
});

message.textContent = "Current player: X";
