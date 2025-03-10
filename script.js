
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const setSquare = (index, marker) => {
      board[index] = marker;
    };
  
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return {
      getBoard,
      setSquare,
      resetBoard
    };
  })();
  
  const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
  };
  
  const DisplayController = (() => {
    const squares = document.querySelectorAll(".square");
    const resultDisplay = document.getElementById("resultDisplay");
  
    const renderBoard = () => {
      const board = Gameboard.getBoard();
      squares.forEach((square, index) => {
        square.textContent = board[index];
      });
    };
  

    const setResultMessage = (message) => {
      resultDisplay.textContent = message;
    };
  
    return {
      renderBoard,
      setResultMessage
    };
  })();
  
  const GameController = (() => {
    let player1;
    let player2;
    let currentPlayer;
    let gameOver = false;
  
    const startGame = (p1Name, p2Name) => {

      const name1 = p1Name || "Player 1";
      const name2 = p2Name || "Player 2";
  
      player1 = Player(name1, "X");
      player2 = Player(name2, "O");
      currentPlayer = player1;
      gameOver = false;
  
      Gameboard.resetBoard();
      DisplayController.renderBoard();
  
      DisplayController.setResultMessage(`${currentPlayer.getName()}'s turn`);
    };
  
    const handleMove = (index) => {
      if (gameOver) return;
  
      const board = Gameboard.getBoard();
      if (board[index] !== "") return;
      Gameboard.setSquare(index, currentPlayer.getMarker());
      DisplayController.renderBoard();
  
      if (checkWin(currentPlayer.getMarker())) {
        DisplayController.setResultMessage(`${currentPlayer.getName()} Win!`);
        gameOver = true;
        return;
      }
  
      if (checkTie()) {
        DisplayController.setResultMessage("Tie!");
        gameOver = true;
        return;
      }
  
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      DisplayController.setResultMessage(`${currentPlayer.getName()}'s turn`);
    };
  
    const checkWin = (marker) => {
      const winConditions = [
        [0,1,2], [3,4,5], [6,7,8], 
        [0,3,6], [1,4,7], [2,5,8], 
        [0,4,8], [2,4,6]           
      ];
      const board = Gameboard.getBoard();
      return winConditions.some(condition => {
        return condition.every(index => board[index] === marker);
      });
    };
  
    const checkTie = () => {
      const board = Gameboard.getBoard();
      return board.every(cell => cell !== "");
    };
  
    const restartGame = () => {
      startGame(player1.getName(), player2.getName());
    };
  
    return {
      startGame,
      handleMove,
      restartGame
    };
  })();

  document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".square");
    const resetBtn = document.getElementById("resetBtn");
    const openModalBtn = document.getElementById("openModalBtn");
    const overlay = document.getElementById("overlay");
    const startGameBtn = document.getElementById("startGameBtn");
    const player1NameInput = document.getElementById("player1Name");
    const player2NameInput = document.getElementById("player2Name");
  
    squares.forEach((square, index) => {
      square.addEventListener("click", () => {
        GameController.handleMove(index);
      });
    });
  
    openModalBtn.addEventListener("click", () => {
      overlay.classList.remove("hidden"); 
    });
  
    startGameBtn.addEventListener("click", () => {
      const p1Name = player1NameInput.value;
      const p2Name = player2NameInput.value;
  
      GameController.startGame(p1Name, p2Name);
  
      overlay.classList.add("hidden");
    });
  
    resetBtn.addEventListener("click", () => {
      GameController.restartGame();
    });
  });
  