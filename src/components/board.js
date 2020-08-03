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
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
        className={highlight ? "win-square" : ""}
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
        <div key={i} className="board-row">
          {arSquares}
        </div>
      );
    }
    return <div>{squareContainer}</div>;
  }
}
