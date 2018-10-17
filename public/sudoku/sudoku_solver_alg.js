/*

This game comes in 4 modes: expert, advanced, intermediate, and basic.
Each mode gives access to more helper functions than the next, making your lives easier.

Each mode comes with:

Expert:
getValueAt(row, col) -> returns the value in the cell at coords (row, col), returns 0 if the cell is empty
setValueAt(row, col, value) -> sets the value of the cell at (row, col) to value
removeValueAt(row, col) -> removes the value of the cell at (row, col)

Advanced:
isValid(values) -> returns whether an array of values makes a valid row/column/square (that is, no duplicate values)
isSquareValid(squareRow, squareCol) -> returns whether the square at (squareRow, squareCol) is valid, note 0 <= squareRow, squareCol <= 2

Intermediate:
isCellEmpty(row, col) -> returns whether the cell at (row, col) is empty
isSquareIncludingValid(row, col) -> returns whether the square including the cell at (row, col) is a valid square)
isRowValid(row) -> returns whether the row `row` is a valid row
isColValid(col) -> returns whether the column `col` is a valid column

Basic:
isGameSolved() -> returns whether the game is solved
isMoveValid(row, col) -> tests whether the move you've ALREADY MADE at (row, col) is a valid move
getNextEmptyCell() -> returns the next empty cell on the sudoku board


For example, basic mode allows you to use any of the functions listed above.


Note 0 <= row, col <= 8 and 1 <= value <= 9
*/


// this is where put your solution
// the sudoku board updates automatically based on 
// setValueAt(row, col, val) and removeValueAt(rowm col)
// should return whether or not you found a solution
function solveSudoku() {
   return false;
}
