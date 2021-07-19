import React from "react";

function Square(props) {
  return (
    <button
      onClick={() => {
        props.onClick();
      }}
      className={"square " + props.className}
    >
      {props.value}
    </button>
  );
}

export class Board extends React.Component {
  renderSquare = (i, highlight) => {
    let className = highlight ? "bg-color-5 text-white " : "bg-color-4 text-color-5 ";
    className += "m-1";
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
        className={className}
      />
    );
  };

  render() {
    let winner = this.props.someoneWon;
    let squareContainer = [];

    for (let i = 0; i < 3; i++) {
      let arSquares = [];

      for (let j = 0; j < 3; j++) {
        let id = i * 3 + j;
        let champion;
        if (!winner) {champion = false}
        else {
          champion = (winner[1].includes(id))? true :false;
        }
        arSquares.push(this.renderSquare(id, champion));
      }

      squareContainer.push(
        <div key={i} className="board-row flex justify-center flex-row">
          {arSquares}
        </div>
      );
    }
    return <div md className="board-container my-auto w-full h-full flex flex-col justify-center items-center">{squareContainer}</div>;
  }
}
