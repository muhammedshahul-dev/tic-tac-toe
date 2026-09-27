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
