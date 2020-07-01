import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}
// class Square extends React.Component {
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      gameWinner: null,
      draw: null,
      history: []
    };
  }

  determineWhichIsNext = (squares, i) => {
    if(squares[i] === null && this.state.gameWinner === null && this.state.draw !== true){
      if(this.state.isXNext){
        squares[i] = 'X';
      }else{
        squares[i] = 'O';
      }
      this.setState(
        {
          squares: squares, isXNext: !this.state.isXNext
        },
          this.checkWinCondition
      );
    }else{
      return ;
    }
  }

  updateHistory = () => {
    let history = [...this.state.history];
    history.push(this.state.squares);
    this.setState({history})
  }

  checkWinCondition = () => {
    const lines = [
      // horizontals
      [0,1,2],
      [3,4,5],
      [6,7,8],
      // verticals
      [0,3,6],
      [1,4,7],
      [2,5,8],
      //diagonal
      [0,4,8],
      [2,4,6]
    ];

    let finishedGame = true;
    for(let i = 0; i < lines.length; i++){
      let one = lines[i][0];
      let two = lines[i][1];
      let three = lines[i][2];
      let item = this.state.squares
      if(item[one] == null || item[two] == null || item[three] == null){
        finishedGame = false;
      }
    }


    for(let i = 0; i < lines.length ;i++){
      let one = lines[i][0];
      let two = lines[i][1];
      let three = lines[i][2];
      let item = this.state.squares;

      if(item[one] && item[one] === item[two] && item[two] === item[three]){
        this.setState({gameWinner: item[one]})
      }
    }


    if(finishedGame && this.state.gameWinner != null){
      console.log(finishedGame, this.state.gameWinner)
      this.setState({draw: false})
    }else if(finishedGame && this.state.gameWinner == null){
      console.log(finishedGame, this.state.gameWinner)

      this.setState({draw: true})
    }

    this.updateHistory()
  }


  handleClick = (i) => {
    const squares = this.state.squares.slice();
    this.determineWhichIsNext(squares, i);

  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderGameResult(){
    let result;
    if(this.state.draw){
      result = 'Tied Game';
    }else if(this.state.gameWinner != null){
      result = `Game Winner is ` + this.state.gameWinner;
    }else{
      result = 'Let the game commence!'
    }

    return result;
  }

  timeTravel = (i) => {
    const newState = this.state.history[i].slice();
    this.setState({squares: newState})

    // this.setState({squares: newState, history: this.state.history.slice(0, i)})
    console.log('done')
  }

  historyListItem = () => {
    let historyList = this.state.history.map((item, i) => {
      return (
        <li key={"timetravel"+i}><button onClick={() => this.timeTravel(i)}>Move {i}</button></li>
      )
    });

    return(
      <div>
        {historyList}
      </div>
    )
  }

  render() {
    let status = '';
    if(this.state.gameWinner === null || this.state.draw !== true || this.state.draw !== false){
      status = this.state.isXNext ? 'Next to move is X' : 'Next to move is O';
    }

    return (
      <div>
        <h1>{this.renderGameResult()}</h1>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
        <h4>History</h4>
        <ul>
          {this.historyListItem()}
        </ul>

      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
