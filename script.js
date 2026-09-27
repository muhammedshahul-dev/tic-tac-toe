// 1. GameBoard Module
const GameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const playerMark = (index, mark) => {
    if (board[index] === '') {
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
    playerMark,
    reset,
  };
})();

// 2. Player Factory Function
const Player = (name, mark) => {
  return {
    name,
    mark,
  };
};

// 3. GameController Module
const GameController = (() => {
  const players = [Player('Player 1', 'X'), Player('Player 2', 'O')];
  let activePlayer = players[0];
  let isGameOver = false;

  const getActivePlayer = () => activePlayer;
  const getIsGameOver = () => isGameOver;

  const setPlayerNames = (name1, name2) => {
    players[0].name = name1;
    players[1].name = name2;
  };

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
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

  const checkTie = () => {
    const currentBoard = GameBoard.getBoard();
    return currentBoard.every((cell) => cell !== '');
  };

  const playRound = (index) => {
    if (isGameOver) return;

    const markPlaced = GameBoard.playerMark(index, activePlayer.mark);
    if (!markPlaced) return;

    if (checkWin()) {
      isGameOver = true;
      return;
    }

    if (checkTie()) {
      isGameOver = true;
      return;
    }

    switchPlayer();
  };

  const restartGame = () => {
    GameBoard.reset();
    activePlayer = players[0];
    isGameOver = false;
  };

  return {
    playRound,
    getActivePlayer,
    getIsGameOver,
    setPlayerNames,
    checkWin,
    checkTie,
    restartGame,
  };
})();

// 4. DisplayController Module (DOM Management)
const DisplayController = (() => {
  const boardContainer = document.getElementById('board-container');
  const statusDisplay = document.getElementById('status-display');
  const restartBtn = document.getElementById('restart-btn');
  const startBtn = document.getElementById('start-btn');
  const player1Input = document.getElementById('player1-input');
  const player2Input = document.getElementById('player2-input');

  const updateScreen = () => {
    boardContainer.innerHTML = '';

    const board = GameBoard.getBoard();
    const activePlayer = GameController.getActivePlayer();
    const isGameOver = GameController.getIsGameOver();
    const isWin = GameController.checkWin();
    const isTie = GameController.checkTie();

    // Render cells
    board.forEach((cellValue, index) => {
      const cellButton = document.createElement('button');
      cellButton.classList.add('cell');
      cellButton.dataset.index = index;
      cellButton.textContent = cellValue;

      if (cellValue !== '') {
        cellButton.classList.add(cellValue.toLowerCase());
      }

      cellButton.addEventListener('click', () => {
        GameController.playRound(index);
        updateScreen();
      });

      boardContainer.appendChild(cellButton);
    });

    // Update status banner
    if (isWin) {
      statusDisplay.textContent = `🎉 ${activePlayer.name} (${activePlayer.mark}) wins!`;
    } else if (isTie) {
      statusDisplay.textContent = "🤝 It's a tie!";
    } else {
      statusDisplay.textContent = `It's ${activePlayer.name}'s turn (${activePlayer.mark})`;
    }
  };

  // Event Listeners
  restartBtn.addEventListener('click', () => {
    GameController.restartGame();
    updateScreen();
  });

  startBtn.addEventListener('click', () => {
    const p1Name = player1Input.value.trim() || 'Player 1';
    const p2Name = player2Input.value.trim() || 'Player 2';

    GameController.setPlayerNames(p1Name, p2Name);
    GameController.restartGame();
    updateScreen();
  });

  // Initial setup render
  updateScreen();

  return { updateScreen };
})();
