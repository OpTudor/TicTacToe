const Player = (sign) => {
  this.sign = sign;
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
  const fields = document.querySelectorAll("field");
  fields.forEach((field) => {
    field.addEventListener("click", (e) => {
      gameBoard.setField(e.target.dataset.index, "x");
      updateGameBoard();
    });

    const updateGameBoard = () => {
      for (let i = 0; i < field.length; i++) {
        fields[i].textContent = gameBoard.getField(i);
      }
    };
  });
})();

const gameController = (() => {
  const playerX = Player("X");
  const player0 = Player("0");
  let moves = 0;
})();
