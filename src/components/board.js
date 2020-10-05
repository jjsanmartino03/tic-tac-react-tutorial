import React from "react";
import {Col,} from "react-bootstrap";

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
    let className = highlight ? "win-square " : "";
    className += "d-flex text-center p-0 justify-content-center align-items-center";
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
        <div key={i} className="board-row m-0 p-0 d-flex justify-content-center w-auto flex-row board-row">
          {arSquares}
        </div>
      );
      console.log(squareContainer)
    }
    return <Col md className="board-container p-5 shadow d-flex flex-column align-items-center w-auto p-0">{squareContainer}</Col>;
  }
}
