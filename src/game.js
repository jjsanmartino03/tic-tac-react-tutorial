/* eslint-disable eqeqeq */
import React from "react";
import { Board } from "./components/board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          moveLocation: [0,0],
        }
      ],
      xIsNext: true,
      step: 0,
      sort: true,
    };
  }

  handleClick = (i) => {
    let history = this.state.history;
    let step = this.state.step;
    let current = history[step].squares;
    let squares = current.slice();

    if (squares[i] || this.checkWinner(squares)) { 
      return;
    };

    if (step+1 != history.length ){
      history = history.slice(0, step+1);
    };
    squares[i] = this.state.xIsNext ? "X" : "O";
    history.push({
      squares,
      moveLocation: [Math.floor(i/3), i%3],
    });
    this.setState({
      history,
      xIsNext: !this.state.xIsNext,
      step: this.state.step+1,
    });
  };

  checkWinner = (squares) => {
    const possibleLines = [
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
        return [squares[a], [a,b,c]];
      }
    }
    return null;
  };

  jumpTo = (move) => {
      this.setState({
        xIsNext: (move % 2 == 0),
        step : move,
      })
  }
  sortMoves = () => {
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
    if (someoneWon){
      status = `The winner is: ${someoneWon[0]}`;
    }else if (squares.every(x => x)){
      status = "It's a draw!";
    }else{
      status = "Next turn: " + (this.state.xIsNext ? "X" : "O");
    };

    var componentsArray = [];
            for (let i=0;i<history.length;i++){
                let [a, b] = history[i].moveLocation; 

                componentsArray.push(
                <li key={i}>

                <button 
                className={step == i ? "selected-move" : ""}
                onClick={() => this.jumpTo(i)}>
                {(i === 0 ? "Go to the start" : 
                `Go to move #${i}`) + ` at (${a},${b})`}
                </button>

                </li>
                )
            }
    if (!this.state.sort){
      componentsArray.reverse()
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            someoneWon={someoneWon}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <input type="checkbox" onChange={this.sortMoves}/>Revert list
          <ol>
          { componentsArray}
          </ol>
        </div>
      </div>
    );
  };
}
