import React, { useCallback, useEffect, useState } from "react";

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [moveNumber, setMoveNumber] = useState(0);
  const [history, setHistory] = useState([{ squares: Array(9).fill("") }]);

  //   console.log(board,"hii")

  const winnerList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    checkWinner();
  }, [board, currentPlayer]);

  const handleItemClick = useCallback(
    (index) => {
      if (!winner && board[index] === "") {
        const newBoard = board.slice();
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        setMoveNumber(moveNumber + 1);

        const newHistory = history.slice(0, moveNumber + 1);
        newHistory.push({ squares: newBoard });
        setHistory(newHistory);
      }
    },
    [board, currentPlayer, winner, moveNumber, history]
  );

  const checkWinner = () => {
    for (const [a, b, c] of winnerList) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    setWinner(null);
  };
  // console.log(currentPlayer)

  const jumpToMove = (move) => {
    setMoveNumber(move);
    setBoard(history[move].squares.slice());
    setCurrentPlayer(move % 2 === 0 ? "X" : "O");
    setWinner(null);
  };

  const resetGame = () => {
    setCurrentPlayer("X");
    setBoard(Array(9).fill(""));
    setWinner("");
    setMoveNumber(0);
    setHistory([{ squares: Array(9).fill("") }]);
  };

  const renderMoves = () => {
    return history.map((step, move) => (
      <li key={move}>
        <button
          onClick={() => jumpToMove(move)}
          className="p-2 bg-gray-300 mt-[10px] ml-[22px]"
        >
          {move === 0 ? "Go to Start Game" : `Go to Move #${move}`}
        </button>
      </li>
    ));
  };

  return (
    <div>
      <section className="grid gap-2 justify-center">
        <h1 className="text-[30px] font-medium text-cyan-700 underline">Tic Tac Toe Game</h1>
        <div className="flex">
          <span className="text-[20px] font-medium">
            {" "}
            {winner ? (
              <div>Player <span className={winner === 'X' ? 'text-red-500' : 'text-red-500'}>{winner}
              </span > wins!</div>
            ) : (
              <div>Turn for: {currentPlayer}</div>
            )}
           
          </span>
          <button  onClick={resetGame} className="p-2 bg-gray-300  ml-[22px] ">Reset</button>
        </div>
      
      <div className="flex justify-center mt-[20px]">
        <div className=" grid grid-cols-3 ">
          {board?.map((item, index) => (
            <button
              key={index}
              value={0}
              className=" border float-left text-2xl font-bold leading-[34px] h-[60px] text-center w-[60px] -mr-px -mt-px p-0 border-solid border-[#999] bg-[#fff]-300;"
              onClick={() => handleItemClick(index)}
            >
              <span className="" >{item}</span>
            </button>
          ))}
        </div>

       
      </div>
      </section>
      <section className="grid  justify-center">
          <ul>{renderMoves()}</ul>
         
        </section>
    </div>
  );
};

export default Game;
