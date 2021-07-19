import React, { useState } from "react";
import { Board } from "./components/board";

export default function Game() {
  const [history, setHistory] = useState([
    {
      // The history of movements and positions
      squares: Array(9).fill(null), // Position 0
      moveLocation: [0, 0],
    },
  ]);
  const [isNext, setIsNext] = useState("x");
  const [step, setStep] = useState(0);
  const [reverse, setReverse] = useState(false);

  const checkWinner = (squares) => {
    // Check the winner
    const possibleLines = [
      // possible lines to win
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of possibleLines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [squares[a], [a, b, c]];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    // handle click of a square
    setHistory((prevHistory) => {
      const currentSquares = [...history[step].squares]; // The current position

      if (currentSquares[i] || checkWinner(currentSquares)) {
        return prevHistory; // if the square is ocuppied or the game finished, do nothing
      }

      if (step + 1 !== prevHistory.length) {
        // If the current step is not the length of the game, cut the restant positions, to start again from the current step
        prevHistory = prevHistory.slice(0, step + 1);
      }

      currentSquares[i] = isNext === "x" ? "X" : "O";

      setStep((step) => step + 1);
      setIsNext((prevPlayer) => (prevPlayer === "x" ? "o" : "x"));

      return [
        ...prevHistory,
        {
          squares: currentSquares,
          moveLocation: [Math.floor(i / 3), i % 3],
        },
      ];
    });
  };

  const jumpTo = (move) => {
    // change the step in which the game is
    const nextPlayer = move % 2 === 0 ? "x" : "o";
    setStep(() => move);
    setIsNext(nextPlayer);
  };

  const sortMoves = () => {
    // reverse the list
    setReverse((reverse) => !reverse);
  };

  const squares = history[step].squares;
  const someoneWon = checkWinner(squares);

  let status;

  if (someoneWon) {
    status = `The winner is: ${someoneWon[0]}`;
  } else if (squares.every((x) => x)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (isNext === "x" ? "X" : "O");
  }

  const movementsList = []; // the array of buttons to change the current step in the game

  for (let i = 0; i < history.length; i++) {
    let [a, b] = history[i].moveLocation;

    movementsList.push(
      <button
        key={i}
        className={
          (step === i ? " " : "") +
          "px-6 py-4 shadow-lg rounded-lg text-xl font-bold text-color-3 bg-color-1"
        }
        onClick={() => jumpTo(i)}
      >
        {i}
      </button>
    );
  }

  if (reverse) {
    movementsList.reverse();
  }

  return (
    <div className="app-wrapper w-screen bg-color-1 min-h-screen flex justify-center items-center p-4">
      <div className="game-container bg-color-3 shadow-xl pb-5 pt-8 px-8 flex flex-col items-center rounded-xl sm:w-8/12 w-full">
        <h1 className="text-center m-0 pb-3 text-6xl">Tic-tac-toe</h1>
        <h3
          className={
            "text-2xl p-1.5 rounded text-color-5 mt-1 " +
            (someoneWon ? "bg-green-400" : "bg-color-2")
          }
        >
          {status}
        </h3>
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 pb-10 pt-8 w-full">
          <Board
            squares={squares}
            someoneWon={someoneWon}
            onClick={handleClick}
          />
          <div className="w-full flex flex-col items-center justify-start">
            <label className="flex justify-start items-center mb-4">
              <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                <input
                  checked={reverse}
                  onChange={() => setReverse((reverse) => !reverse)}
                  type="checkbox"
                  className="opacity-0 absolute"
                />
                <svg
                  className={
                    "text-indigo-600 fill-current w-4 h-4 text-green-500 pointer-events-none" +
                    (reverse ? " block" : " hidden")
                  }
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <div className="text-lg select-none">Reverse list</div>
            </label>
            <div className="grid grid-cols-3 gap-3">{movementsList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
