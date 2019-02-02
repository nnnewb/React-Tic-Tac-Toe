import React from 'react'
import ReactDOM from "react-dom";
import './index.css'

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                xIsNext: true,
                isGameOver: false,
            }]
        }
    }

    squares() {
        return this.state.history[this.state.history.length - 1].squares.slice();
    }

    winner() {
        return calculateWinner(this.squares())
    }

    status() {
        const winner = this.winner();
        if (winner) {
            return 'Winner ' + winner
        } else {
            return 'Next player ' + (this.state.xIsNext ? 'X' : 'O')
        }
    }

    renderHistory() {
        return this.state.history.map((step, move) => {
            const desc = move ? `Move #${move} ${step.xIsNext ? 'X' : 'O'}` : 'Game Start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            )
        });
    }

    jumpTo(i) {
        const history = this.state.history.slice(0, i + 1);
        this.setState({history: history})
    }

    handleClick(i) {
        const cur = this.state.history[this.state.history.length - 1];
        if (cur.isGameOver) return;
        const history = this.state.history.slice();
        const squares = this.squares();
        squares[i] = cur.xIsNext ? 'X' : 'O';
        history.push({
            squares: squares,
            xIsNext: !cur.xIsNext,
            isGameOver: calculateWinner(squares)
        });
        this.setState({history: history});
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.squares()} onClick={this.handleClick.bind(this)}/>
                </div>
                <div className="game-info">
                    <div>{this.status()}</div>
                    <ol>{this.renderHistory()}</ol>
                </div>
            </div>
        );
    }
}

// ============================
// Render react content
ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
