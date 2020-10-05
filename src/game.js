import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { Board } from "./components/board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [// The history of movements and positions
        {
          squares: Array(9).fill(null), // Position 0
          moveLocation: [0, 0],
        }
      ],
      xIsNext: true, // if false, "O" is next
      step: 0, // The current movement numver
      sort: true, // Reverse or not the list
    };
  }

  handleClick = (i) => { // handle click of a square
    let history = this.state.history;
    let step = this.state.step;
    let current = history[step].squares; // The current position
    let squares = current.slice(); // Make a copy

    if (squares[i] || this.checkWinner(squares)) {
      return; // if the square is ocuppied or the game finished, do nothing
    };

    if (step + 1 !== history.length) { // If the current step is not the length of the game, cut the restant positions, to start again from the current step
      history = history.slice(0, step + 1);
    };

    squares[i] = this.state.xIsNext ? "X" : "O";

    history.push({
      squares,
      moveLocation: [Math.floor(i / 3), i % 3],
    }); // push the movement into the history

    this.setState({
      history,
      xIsNext: !this.state.xIsNext, // Change the turn
      step: this.state.step + 1,
    });
  };

  checkWinner = (squares) => { // Check the winner
    const possibleLines = [ // possible lines to win
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

  jumpTo = (move) => { // change the step in which the game is
    this.setState({
      xIsNext: (move % 2 === 0),
      step: move,
    })
  }
  sortMoves = () => {// reverse the list
    this.setState(
      {
        sort: !this.state.sort,
      }
    )
  }
  render = () => {
    let history = this.state.history;
    let step = this.state.step;
    let squares = history[step].squares;

    let someoneWon = this.checkWinner(squares);

    let status;

    if (someoneWon) {
      status = `The winner is: ${someoneWon[0]}`;
    } else if (squares.every(x => x)) {
      status = "It's a draw!";
    } else {
      status = "Next turn: " + (this.state.xIsNext ? "X" : "O");
    };

    var componentsArray = []; // the array of buttons to change the current step in the game

    for (let i = 0; i < history.length; i++) {
      let [a, b] = history[i].moveLocation;

      componentsArray.push(
        <li key={i}>
          <Button
            className={(step === i ? "selected-move " : "") + "back-rose mb-2 py-1 text-warning border-0"}
            onClick={() => this.jumpTo(i)}>
            {(i === 0 ? "Go to the start" :
              `Go to move #${i}`) + ` at (${a},${b})`}
          </Button>
        </li>
      )
    }

    if (!this.state.sort) {
      componentsArray.reverse()
    }
    
    return (
      <Container fluid className="mb-5 d-flex flex-column align-items-center pt-5">
        <h1 className="text-center text-dark">Tic-tac-toe React App</h1>
        <Row className="game justify-content-center mt-4">

          <Board
            squares={squares}
            someoneWon={someoneWon}
            onClick={this.handleClick}
          />
          <Col md className="mt-4 mt-md-0 board-container d-flex flex-column game-info">
            <Container>
              <h3 className="text-center text-light w-100">{status}</h3>
              <div className="my-2 d-flex align-items-center">
                <input type="checkbox" id="revert" className="mx-0 mr-2" onChange={this.sortMoves} />
                <label className="revert-label m-0" for="revert">Revert list</label>
              </div>

              <ol className="p-0 d-flex w-100 flex-column align-items-center">
                {componentsArray}
              </ol>
            </Container>

          </Col>
        </Row>

      </Container>
    );
  };
}
