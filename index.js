const label = document.querySelector("label");
const display = document.getElementById("turn");
const Player = (sign) => {
  const getSign = () => {
    return sign;
  };

  return { getSign };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, sign) => {
    board[index] = sign;
  };

  const getField = (index) => {
    return board[index];
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setField, getField, resetBoard };
})();

const displayController = (() => {
  const fields = document.querySelectorAll(".field");
  const restartButton = document.getElementById("restartButton");
  const updateGameBoard = () => {
    for (let i = 0; i < fields.length; i++) {
      fields[i].textContent = gameBoard.getField(i);
    }
  };
  fields.forEach((field) => {
    field.addEventListener("click", (e) => {
      if (
        e.target.textContent === "" &&
        gameController.checkWinner() === null
      ) {
        gameController.playRound(e.target.dataset.index);
        updateGameBoard();
      }
    });
  });
  restartButton.addEventListener("click", () => {
    gameBoard.resetBoard();
    updateGameBoard();
    label.textContent = "Next up:";
    display.textContent = "X";
  });
})();

const gameController = (() => {
  const playerX = Player("X");
  const player0 = Player("0");
  let moves = 0;
  const playRound = (index) => {
    gameBoard.setField(index, getCurrentPlayer());
    moves++;
    upNext();
    const winner = checkWinner();
    if (winner) {
      label.textContent = "Winner is:";
      getWinner();
      moves = 0;
    }
    if (moves === 9) {
      label.textContent = "Winner is:";
      display.textContent = "Nobody";
      moves = 0;
    }
  };

  const getCurrentPlayer = () => {
    return moves % 2 === 0 ? playerX.getSign() : player0.getSign();
  };

  const getWinner = () => {
    sign = moves % 2 === 1 ? playerX.getSign() : player0.getSign();
    display.textContent = sign;
  };

  const upNext = () => {
    display.textContent = getCurrentPlayer();
  };

  const checkWinner = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      const fieldA = gameBoard.getField(a);
      const fieldB = gameBoard.getField(b);
      const fieldC = gameBoard.getField(c);

      if (fieldA && fieldA === fieldB && fieldA === fieldC) {
        return fieldA;
      }
    }
    return null;
  };

  return { playRound, checkWinner };
})();
