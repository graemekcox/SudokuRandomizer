import os, random, math

num_turns = 0

def generate_board():
    w,h = 9, 9
    board = [[0 for x in range(w)] for y in range (h)]

    # for i in range(h):
    #     arr = list(range(1,10))
    #     random.shuffle(arr)
    #     board[i] = arr

    board[0] = [0,2,0,4,5,6,7,8,9]
    board[1] = [4,5,7,0,8,0,2,3,6]
    board[2] = [6,8,9,2,3,7,0,4,0]
    
    board[3] = [0,0,5,3,6,2,9,7,4]
    board[4] = [2,7,4,0,9,0,6,5,3]
    board[5] = [3,9,6,5,7,4,8,0,0]

    board[6] = [0,4,0,6,1,8,3,9,7]
    board[7] = [7,6,1,0,4,0,5,2,8]
    board[8] = [9,3,8,7,2,5,0,6,0]

    return board

def print_board(board):
    for i in range(len(board)):
        if ( (i % 3) == 0):
            print("----------------\n")
        for j in range(len(board[i])):

            if (j % 3 ==0 and j != 0):
                print(" | ", end="")
            print(board[i][j], end="")
            
            if (j == 8):
                print("\n")

### Returns indexes for next
def find_empty(board):
    for i in range(len(board)):
        for j in range(len(board[i])):
            if board[i][j] == 0:
                return i,j

    return -1, -1


def check_if_valid(val, row, col, board):
    # Check row
    if (val in board[row]):
        return False
    
    # Check col
    cols = []
    for i in range(9):
        if (board[i][col] == val):
            return False

    ## Check box
    start_col = (col // 3) * 3
    start_row = (row // 3) * 3

    for i in range(start_row, start_row + 3):
        for j in range(start_col, start_col+3):
            if board[i][j] == val and (row,col) != (i,j):
                return False

    return True

def solve_board(board):
    i,j = find_empty(board)
    if (i == -1 or j == -1):
        return True # Signal that board is solved

    for temp_val in range(1,10):
        if check_if_valid(temp_val, i , j, board):
            board[i][j] = temp_val

            num_turns = num_turns + 1

            ## See if the board can be solved with this temp_val
            if (solve_board(board)):
                return True
            else:
                board[i][j] = 0 # Reset value if this isn't a solution

    return False


def main():
    board = generate_board()
    
    num_turns = 0
    print("------ORIGINAL------")
    print_board(board)
    print("------SOLVED------")

    solve_board(board)

    print_board(board)

    print("Number of turns to solve = %", num_turns)

if __name__ == "__main__":
    main()