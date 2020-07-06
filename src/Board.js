import React from 'react';
import './Board.css';

class Square extends React.Component{
    // TODO Add other fields necessary to sum up values?
    // Row, col, square ID, box ID?
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id
            // squares
            // id: 1
            // key: 0,
            // squares: this.props.squares
            // value: "" // TODO need to make sure only numbers are input
            // value: 0
        }
        // this.handleChange = this.handleChange.bind(this); // TODO is this necessary?
    }

    check_row(new_val, row)
    {
        var values = Array(9);

        for (var ind= row*9; ind<( (row+1) * 9); ind ++){
            if (this.props.squares[ind] != null)
                values[ind] = Number(this.props.squares[ind]);
            else   
                values[ind] = 0;
        }
        if (values.indexOf(new_val) != -1){ // Check if this current value is within the array already
            return -1;
        }

    }

    check_col(new_val, col){
        var values = Array(9);

        for (var ind=col; ind< (9*9)   ; ind=ind+9){
            if (this.props.squares[ind] != null)
                values[ind] = Number(this.props.squares[ind]);
            else   
                values[ind] = 0;
        }
        if (values.indexOf(new_val) != -1){ // Check if this current value is within the array already
            return -1;
        }
    }

    check_box(new_val, row, col){
        var values = Array(9);

        var start_col = Math.floor(col / 3);
        var start_row = Math.floor(row / 3) * 3;
        var start_ind = start_row * 9 + start_col;

        for (var i=0; i < 3 ; i++) {
            for (var j=0; j<3; j++){
                var ind = start_ind + j + (i*9);
                if (this.props.squares[ind] != null)
                    values[ind] = Number(this.props.squares[ind]);
                else
                    values[ind] = 0;
            }
        }
        if (values.indexOf(new_val) != -1)
            return -1;
    }

    check_if_valid(new_val) {
        var sum, row, col;
        // var values = Array(9);
        console.log("ID = " + this.state.id + ": New val = " + new_val)

        // console.log(this.props.squares)

        // Get current col and row
        col = (this.state.id) % 9;
        row = Math.floor(Number(this.state.id / 9));

        console.log("COL "+ col + " : ROW = " + row)
        sum = 0;
        // go through all row indexes, and make sure current value is unique
        
        if (this.check_row(new_val, row) == -1)
            return -1;

        if (this.check_col(new_val, col) == -1)
            return -1;

        if (this.check_box(new_val, row, col) == -1)
            return -1;

        // If all this is unique for all sections, then value can be updated
        return new_val;
    }

    onFieldChange(event) {
        var new_val;
        if ((event.target.value < 1 || event.target.value > 9) && event.target.value != "") {
            // TODO Contrain values to be within this range
            // TODO, make square go red for a bit when value is bad?
            this.setState({value: "" })
            new_val = 0;
        }
        else { // Only update state if it within 1-9
            // TODO only update state if this is a valid number

            new_val = event.target.value;
            if (this.check_if_valid(Number(new_val)) == -1)
                new_val = 0;
        }

        const fieldName = event.target.name;
        
        this.props.onChange(this.state.id, fieldName, new_val)
        // this.props.onChange(this.state.id, fieldName, fieldValue)
    }

    render() {
        return (
            <input 
                className="square" 
                value={this.props.squares[this.props.id]}
                // value={this.props.value}
                onChange={this.onFieldChange.bind(this)}
            >
                 {/* {this.props.value} */}
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

    onChange(i, field, value) {
        
        const squares = this.state.squares.slice();
        
        // value = this.sumRows(i, Number(value))
        // if (value != -1) // If -1, then this value is not valid
        squares[i]= value;
        
        this.setState({squares: squares});
    }

    renderSquare(i) {
        return <Square
            id={i}
            squares={this.state.squares}
            onChange={this.onChange.bind(this)}
            value={this.state.squares[i]}
        >
        
        </Square>;
    }

    render(){        
        var squares = []
        
        for (var i=0; i<81; i++) {
            squares.push(this.renderSquare(i));
        }
        return (
            <div>
                <div className="title">Sudoku</div>
                <div className="board">
                    <ul>{squares}</ul>
                </div>
            </div>
        )
    }
}

// class Game extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             stepNumber: 0,
//             currentSquare: 0
//         };
//     }
// }

export default Board