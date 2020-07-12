import React from 'react';
import './Board.css';
import {generate_board} from './board_functions.js';

    // onFieldChange(event) {
    //     var new_val;
    //     if ((event.target.value < 1 || event.target.value > 9) && event.target.value != "") {
    //         // TODO, make square go red for a bit when value is bad?
    //         this.setState({value: "" })
    //         new_val = 0;
    //     }
    //     else { // Only update state if it within 1-9
    //         new_val = event.target.value;
    //         if (this.check_if_valid(Number(new_val)) == -1)
    //             new_val = 0;
    //     }

    //     const fieldName = event.target.name;
    //     // this.props.onChange(this.state.id, fieldName, event.target.value);
    //    this.props.onChange(this.state.id, fieldName, new_val)
    // }

//     render() {
//         // generate_board();
//         // this.setState({squares: generate_board});
//         return (
//             <input 
//                 className="square" 
//                 type="number"
//                 value={this.props.squares[this.props.id]}
//                 // value={this.props.value}
//                 onChange={this.onFieldChange.bind(this)}
//             />
//         );
//     }
// }
const colors =[
    'rgb(33, 218, 202)',
    'rgb(28, 235, 82)',
    'rgb(38, 168, 255)',
    'rgb(194, 38, 255)',
    'rgb(255, 125, 38)',
    'rgb(235, 100, 79)',
    'rgb(255, 38, 67)',
    'rgb(251, 255, 38)',
    'rgb(38, 42, 255)'
  ]
  
function createEmptyBoard(){
    let board = [];
    for (let row = 0; row < 9 ; row++){
        let column = []
        for (let col = 0; col < 9; col ++){
            // var randomnumber = Math.floor(Math.random() * (9- 1+ 1)) + 1;
            // var randomnumber = Math.floor(Math.random() * (9+ 1)) ;
            // column.push(randomnumber);
            column.push(0);
        }
        board.push(column);
    }
    return board;
}

function createBasicBoard(){
    let board = [
        [0,2,0,4,5,6,7,8,9],
        [4,5,7,0,8,0,2,3,6],
        [6,8,9,2,3,7,0,4,0],
        [0,0,5,3,6,2,9,7,4],
        [2,7,4,0,9,0,6,5,3],
        [3,9,6,5,7,4,8,0,0],
        [0,4,0,6,1,8,3,9,7],
        [7,6,1,0,4,0,5,2,8],
        [9,3,8,7,2,5,0,6,0]
    ]
    return board

}

function check_row(new_val, row, board)
{
    var values = Array(9);

    for (var ind= row*9; ind<( (row+1) * 9); ind ++){
        if (board[ind] != null)
            values[ind] = Number(board[ind]);
        else   
            values[ind] = 0;
    }
    if (values.indexOf(new_val) !== -1){ // Check if this current value is within the array already
        return -1;
    }
}

function check_col(new_val, col, board){
    var values = Array(9);

    for (var ind=col; ind< (9*9)   ; ind=ind+9){
        if (board[ind] != null)
            values[ind] = Number(board[ind]);
        else   
            values[ind] = 0;
    }
    if (values.indexOf(new_val) !== -1){ // Check if this current value is within the array already
        return -1;
    }
}

function check_box(new_val, row, col, board){
    var values = Array(9);

    var start_col = Math.floor(col / 3) * 3;
    var start_row = Math.floor(row / 3) * 3;
    var start_ind = start_row * 9 + start_col;

    for (var i=0; i < 3 ; i++) {
        for (var j=0; j<3; j++){
            var ind = start_ind + j + (i*9);
            if (board[ind] != null)
                values[ind] = Number(board[ind]);
            else
                values[ind] = 0;
        }
    }
    if (values.indexOf(new_val) !== -1)
        return -1;
}

class Board extends React.Component{
    constructor(props){
        super(props);

        let board = createEmptyBoard();
        let initialBoardElements = updateElements(board)

        this.state = {
            board: board,
            boardElements: initialBoardElements
        }
    }

    updateBoardElementsState() {
        let boardElements = updateElements(this.state.board);
        this.setState ({
          boardElements
        })
        console.log(this.state.board);
      }
    

    onChange(i, field, value) {
        let row = Math.floor( i / 9);
        let col = i % 9;

        const board = this.state.board;
        board[row][col] = value;
        
        this.setState({board: board});
    }

    newBoard (){

        let new_board = createBasicBoard();
        let updatedBoardElements = updateElements(new_board);
        // this.setState({board: new_board});
        this.setState ({
            board: new_board,
            boardElements:updatedBoardElements});
            console.log(new_board)
        // this.setState({
            // board: new_board
            // boardElements: updatedBoardElements
        // })
    }

    render(){        

        return (
            <div>
                <div className="sudoku-container">
                    <div className="board">
                        {this.state.boardElements}
                    </div>
                </div>
                <div className="sudoku-buttons">
                    <div className="sudoku-button">Solve</div>
                    <div className="sudoku-button"
                    onClick={this.newBoard.bind(this)}>New Board</div>
                </div>
            </div>
        )
    }
}

function updateElements(board) {

    let options = [1,2,3,4,5,6,7,8,9]
    return (<div className="sudoku-board">
          {board.map(column => (
  
            <div className="sudoku-column">
              {column.map(row => (
  
                //create elements, either solved values or available options
                row === 0 ? 
                  <div  className={`sudoku-element element-${column}-${row}`}>
                    {options.map(option => (
                        <div className={`sudoku-option`} 
                        style={{backgroundColor:colors[9]}}>
                            {option}
                        </div>

                      ))}
  
                  </div>
                  : <div className="sudoku-element"
                     style={{backgroundColor:colors[row- 1]}}>
                        {row}
                    </div>   
  
              ))}
            </div>
  
          ))}
        </div>)
}

export default Board