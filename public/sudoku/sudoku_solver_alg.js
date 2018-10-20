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
Intermediate mode allows you to use any functions except the basic ones.
Etc.


Note 0 <= row, col <= 8 and 1 <= value <= 9
*/


// this is where put your solution
// the sudoku board updates automatically based on 
// setValueAt(row, col, val) and removeValueAt(row, col)
// should return whether or not you found a solution
function solveSudoku() {

    // is the game already solved?
    if (isGameSolved()) return true;

    // somewhere where we can play a value
    // CSP: variable, all the empty cells
    const nextEmptyCell = getNextEmptyCell();
    const row = nextEmptyCell[0];
    const col = nextEmptyCell[1];

    // CSP: domain, loop through all the values we can put in each cell
    let value;
    for (value = 1; value <= 9; value++) {
        // set the value of the first empty cell
        setValueAt(row, col, value);

        // is the move we made a valid choice
        // CSP: constraint
        if (isMoveValid(row, col)) {
            // attempt to solve the new board we just made (with the value we added)
            const didWeSolve = solveSudoku();

            // if we every find any solution that works
            // stop looking for valid solutions
            if (didWeSolve) return true;
        }

        // remove the value we put there
        removeValueAt(row, col);
    }

    return false;
}
