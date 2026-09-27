function GameBoard() {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const player = (index, mark) => {
    if (index === '') {
      board[index] = mark;
      return true;
    }
    return false;
  };
  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
  };

  return {
    getBoard,
    player,
    reset,
  };
}
const palyer = (name, mark) => {
  return {
    name,
    mark,
  };
};
const GameController = (() => {
  const palyers = [palyer('player1', 'X'), palyer('player2', 'O')];
  let activePlayer = palyers[0];
  let isGameOver = false;

  const getActivePlayer = () => activePlayer;
  const getIsGameOver = () => isGameOver;

  const switchPlayer = () => {
    activePlayer =
      activePlayer === activePlayer[0] ? activePlayer[1] : activePlayer[0];
  };
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];
  const checkWin = () => {
    const currentBoard = GameBoard.getBoard();

    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        currentBoard[a] !== '' &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      );
    });
  };
})();
