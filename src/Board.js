import React from 'react';
import './Board.css';

class Square extends React.Component{
    render() {
        return (
            <input className="square">
            </input>
        );
    }
}

class Board extends React.Component{
    renderSquare(i) {
        return <Square />;
    }

    render(){
        const status = "Looking good!";
        
        var squares = []
        
        for (var i=0; i<81; i++) {
            squares.push(this.renderSquare(i));
        }
        return (
            <div>
                <caption className="title">Sudoku</caption>
                <div className="board">
                    <ul>{squares}</ul>
                </div>
                <div>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepNumber: 0,
            currentSquare: 0
        };
    }
}

export default Board