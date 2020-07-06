import React from 'react';
import './Board.css';

class Square extends React.Component{
    // TODO Add other fields necessary to sum up values?
    // Row, col, square ID, box ID?
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id
            // id: 1
            // key: 0,
            // squares: Array(81).fill(null),
            // value: "" // TODO need to make sure only numbers are input
            // value: 0
        }
        // this.handleChange = this.handleChange.bind(this); // TODO is this necessary?
    }

    sumRows() {
        var sum, row, col;

        // Get current col and row
        col = this.props.key % 9;
        row = Math.floor(Number(this.props.key / 9));

        sum = 0;
        // go through all row indexes, and make sure current value is unique
        for (var ind= row*9; ind<( (row+1) * 9); ind ++){
            // sum+= this.props.squares[ind].value;
        }

        // console.log("SQUARES = %0d" + this.props.squares[0])
        console.log("VALUE = " + this.props.value)
        console.log("COL "+ col + " : ROW = " + row)

        return sum;
    }

    onFieldChange(event) {
        // if ((event.target.value < 1 || event.target.value > 9) && event.target.value != "") {
        //     // TODO Contrain values to be within this range
        //     // TODO, make square go red for a bit when value is bad?
        //     console.log("THIS VALUE IS BAD " + event.target.value + ":   " +this.props.id)
        //     this.setState({value: "" })

        // }
        // else { // Only update state if it within 1-9
        //     // TODO only update state if this is a valid number
        //     console.log("THE CURRENT VALUE IS = " + event.target.value)
            
        //     // this.sumRows();

        //     this.setState({ value: event.target.value});
        //     // this.setState({ squares[this.prop]: event.target.value});

        //     // const fieldName = event.target.name;
        //     // const fieldValue = event.target.value;
        //     // this.props.onChange(fieldName, fieldValue);
        //     console.log(this.props)
        // }
        const fieldName = event.target.name;
        const fieldValue = event.target.value;


        this.props.onChange(this.state.id, fieldName, fieldValue)
    }

    render() {
        return (
            <input 
                className="square" 
                value={this.props.value}
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
        squares[i]= value;
        this.setState({squares: squares});
    }

    renderSquare(i) {
        return <Square
            id={i}
            onChange={this.onChange.bind(this)}
            value={this.state.squares[i]}
        >
        
        </Square>;
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
    // componentDidUpdate(prevProps) {
    //     console.log("UPDATED")
    //     // TODO Sum all rows and colms to make sure 
    // }

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