import React from 'react';
import './Board.css';

class Square extends React.Component{
    // TODO Add other fields necessary to sum up values?
    // Row, col, square ID, box ID?
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            value: "" // TODO need to make sure only numbers are input
        }
        this.handleChange = this.handleChange.bind(this); // TODO is this necessary?
    }

    handleChange(event) {
        if ((event.target.value < 1 || event.target.value > 9) && event.target.value != "") {
            // TODO Contrain values to be within this range
            // TODO, make square go red for a bit when value is bad?
            console.log("THIS VALUE IS BAD " + event.target.value + ":   " +this.props.id)
            this.setState({value: "" })

        }
        else { // Only update state if it within 1-9
            // TODO only update state if this is a valid number
            console.log("THE CURRENT VALUE ISP " + event.target.value)
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
    constructor(props){
        super(props);
        this.state = {
            squares: Array(81).fill(null)
        }
    }

    renderSquare(i) {
        return <Square key={i}/>;
    }

    // sumRows() {
    //     var sum, row, col;

    //     // Get current col and row
    //     col = this.props.id % 9;
    //     row = Math.floor(Number(this.props.id / 9));

    //     sum = 0;
    //     // go through all row indexes, and make sure current value is unique
    //     for (var ind= row*9; ind<( (row+1) * 9); ind ++){
    //         sum+= this.props.squares[ind].value;
    //     }

    //     console.log("COL "+ col + " : ROW = " + row)

    //     return sum;
    // }
    componentDidUpdate(prevProps) {
        console.log("UPDATED")
        this.render()
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