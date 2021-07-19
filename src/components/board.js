import React from "react";
import Square from "./square";

export default function Board(props) {
  console.log(props.gameFinished, 'h');
  const renderSquare = (i, highlight) => {
    let className = highlight
      ? "bg-color-5 text-white "
      : "bg-color-4 text-color-5 ";

    if (!props.gameFinished){
      className += ' square-effects ';
    }else{
      className += 'cursor-default ';
    }

    className += " square border-0 w-24 h-24 m-1 font-bold d-2";
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        key={i}
        className={className}
        disabled={props.gameFinished}
      />
    );
  };

  let winner = props.someoneWon;
  let squareContainer = [];

  for (let i = 0; i < 3; i++) {
    let arSquares = [];

    for (let j = 0; j < 3; j++) {
      let id = i * 3 + j;
      let champion;
      if (!winner) {
        champion = false;
      } else {
        champion = winner[1].includes(id) ? true : false;
      }
      arSquares.push(renderSquare(id, champion));
    }

    squareContainer.push(
      <div key={i} className="board-row flex justify-center flex-row">
        {arSquares}
      </div>
    );
  }

  return (
    <div
      md
      className="board-container my-auto w-full h-full flex flex-col justify-center items-center"
    >
      {squareContainer}
    </div>
  );
}
