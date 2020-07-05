import React from 'react';
import './Board.css';

class Square extends React.Component{
    // TODO Add other fields necessary to sum up values?
    // Row, col, square ID, box ID?
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this); // TODO is this necessary?
    }

    handleChange(event) {
        if ((event.target.value < 1 || event.target.value > 9) && event.target.value != "") {
            // TODO Contrain values to be within this range
            // TODO, make square go red for a bit when value is bad?
            console.log("THIS VALUE IS BAD " + event.target.value)
            this.setState({value: "" })

        }
        else { // Only update state if it within 1-9
            // TODO only update state if this is a valid number
            console.log("THE CURRENT VALUE IS " + event.target.value)
            this.setState({ value: event.target.value});
        }
    }

    render() {
        return (
            <input className="square" value={this.state.value} onChange={this.handleChange}>
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
                {/* <Grid container spacing={12}> */}
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