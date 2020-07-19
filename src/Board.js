import React from 'react';
import './Board.css';

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
  
function create_empty_board(){
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

function shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function clean_board(board){
    let valid_ind = new Array(81);
    for (let i=0; i<valid_ind.length; i++){
        valid_ind[i] = i;
    }
    shuffle(valid_ind);

    let num_clues = Math.random() * (32 - 27) + 27;

    for (let i=0; i< (81-num_clues); i++){
        const ind = valid_ind[i];
        const col = ind % 9;
        const row = Math.floor(ind / 9);
        board[row][col] = 0;
    }
    return board;
}


// Return row and column of first zero value
function find_empty(board){
    for (let i=0; i < 9; i++){
        for (let j=0; j<9; j++){
            if (board[i][j] === 0) {
                return [i,j];
            }
        }
    }
    return [-1, -1];
}

function check_if_valid(val, val_row, val_col, board){
    if (board[val_row].includes(val)){ // Check that value is not already in row or column
        return false;
    }

    // Check columns
    for (let i=0; i<9; i++){
        if (board[i][val_col] === val){
            return false;
        }
    }

    // Check box
    var start_col = Math.floor(val_col / 3) * 3;
    var start_row = Math.floor(val_row / 3) * 3;

    for (let row=start_row; row < (start_row + 3); row++){
        for (let col=start_col; col < (start_col+3); col++){
            if ((board[row][col] === val) & (val_row !== row) & (val_col !== col)){
                return false;
            }
        }
    }
    return true;
}


class Board extends React.Component{
    constructor(props){
        super(props);

        let board = create_empty_board();
        let initialBoardElements = this.update_elements(board)

        this.state = {
            board: board,
            boardElements: initialBoardElements
        }
    }

    update_board_elements_state(board) {
        let boardElements = this.update_elements(board);
        this.setState ({
            board: board,
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

    onSolve(){
        let solved_board = this.state.board
        // console.log(solved_board)
        this.solve_board(solved_board)
        // console.log(solved_board)
        let updatedBoardElements = this.update_elements(solved_board);
        this.setState ({
            board: solved_board,
            boardElements:updatedBoardElements});
        // console.log(solved_board)
    }

    newBoard (){
        let new_board = this.create_random_board();
        let updated_board_elements = this.update_elements(new_board);
        // this.setState({board: new_board});
        this.setState ({
            board: new_board,
            boardElements:updated_board_elements});
        console.log(new_board)
    }

    create_random_board(){
        let board = create_empty_board()
    
        let values = new Array(9);
        for (let i=1; i<10; i++){
            values[i] = i;
        }
        shuffle(values)
    
        let valid_ind = new Array(81);
        for (let i=0; i<valid_ind.length; i++){
            valid_ind[i] = i;
        }
        for (let i=0; i<9; i++){
            let ind = valid_ind[i];
            const col = ind % 9;
            const row = Math.floor(i / 9);
    
            board[row][col] = values[i];
        }
        this.solve_board(board); 
        clean_board(board);
    
        return board;
    }
    
    solve_board(board){
        var coord= find_empty(board); // 0 is row, 1 is col
        let row = coord[0];
        let col = coord[1];
        if ( row === -1 | col === -1){
            return true;
        }
    
        for (let temp_val=1; temp_val < 10; temp_val++){
            if (check_if_valid(temp_val, row, col, board)){
                board[row][col] = temp_val;
    
                if (this.solve_board(board)){
                    return true;
                } else {
                    board[row][col] = 0;
                }
            }
        }
    }

    selectOption(row, col, value){
        let board = this.state.board;

        // Check row
        for (let i=0; i<9; i++){
            if (value === board[row][i]){
                return false;
            }
        }

        // Check col
        for (let j=0; j<9; j++){
            if (value === board[j][col]){
                return false;
            }
        }

        // ## Check box
        const start_col = Math.floor(col / 3) * 3
        const start_row = Math.floor(row / 3) * 3

        for (let i=start_row; i<start_row+3; i++){
            for (let j=start_col; j<start_col+3; j++){
                if ((value === board[i][j]) &
                    (i !== row) &
                    (j !== col)){
                        return false
                    }
            }
        }

        // Then 
        // board[col][row] = value;
        board[row][col] = value;

        let updated_board_elements = this.update_elements(board);
        this.setState ({
            board: board,
            boardElements:updated_board_elements});
    }

    update_elements(board) {
        let options = [1,2,3,4,5,6,7,8,9]
        return (<div className="sudoku-board">
            {board.map((row, i) => (
    
                <div className="sudoku-column">
                {row.map((column,j) => (
    
                    //create elements, either solved values or available options
                    column === 0 ? 
                    <div  className={`sudoku-element element-${i}-${j}`}>
                        {options.map(option => (
                            <div className={`sudoku-option`} 
                            style={{backgroundColor:colors[9]}}
                            onClick={()=>this.selectOption(i,j,option)}>
                                {option}
                            </div>

                        ))}
    
                    </div>
                    : <div className="sudoku-element"
                        style={{backgroundColor:colors[column - 1]}}>
                            {column}
                        </div>   
                ))}
                </div>
            ))}
            </div>)
    }
    render(){        

        return (
            <div>
                <div className="sudoku-container">
                    <div className="sudoku-board">
                        {this.state.boardElements}
                    </div>
                    <div className="sudoku-buttons">
                        <div className="sudoku-button"
                        onClick={this.onSolve.bind(this)}>Solve</div>
                        <div className="sudoku-button"
                        onClick={this.newBoard.bind(this)}>New Board</div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Board