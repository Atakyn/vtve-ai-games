// generate board

const DEBUG = false; // whether to print debug information
const STEP_THROUGH = true; // whether to update the board as we go along

// todo: automatically generate boards
const grid = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0], 
    [5, 2, 0, 0, 0, 0, 0, 0, 0], 
    [0, 8, 7, 0, 0, 0, 0, 3, 1], 
    [0, 0, 3, 0, 1, 0, 0, 8, 0], 
    [9, 0, 0, 8, 6, 3, 0, 0, 5], 
    [0, 5, 0, 0, 9, 0, 6, 0, 0], 
    [1, 3, 0, 0, 0, 0, 2, 5, 0], 
    [0, 0, 0, 0, 0, 0, 0, 7, 4], 
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];


const game_container = $('#sudoku-container');

// generate the <tr> and <td> tags on the fly
let i;
for (i = 0; i < 9; i++) {
    const row = document.createElement('tr');
    row.id = `row-${i}`
    row.className = `row-${i % 3}`

    let j;
    for (j = 0; j < 9; j++) {
        const col = document.createElement('td');
        col.id = `cell-${i}-${j}`;
        col.className = `col-${j % 3}`
        col.innerHTML = grid[i][j] || "";

        $(row).append(col);
    }

    game_container.append(row);
}

// call the sudoku solver function
if (solveSudoku()) {
    console.info("Solution found");
} else {
    console.info("No solution found");
}

// displayed the solved board
for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
        _update(i, j)
    }
}


// --- should never be called by user ---
function _checkBounds(row, col) {
    if (row < 0 || row > 9 || col < 0 || col > 9)
        console.error(`Attempted to access invalid cell (${row}, ${col})`);
}

function _update(row, col, val) {
    const cell = `cell-${row}-${col}`;

    setTimeout(function() {
        document.getElementById(cell).innerHTML = val || grid[row][col] || "";
    }, 0);

    // Change color of the elements that are modified
    if(document.getElementById(cell).innerHTML == val || document.getElementById(cell).innerHTML == ""){
        document.getElementById(cell).classList.add('highlight'); // The highlight color can be changed in the sudoku_solver css file
    }
}

// the documentation for all functions below can be found in `sudoku_solver_alg.js`

// --- advanced functions -- 
function isValid(values) {
    let removed = _.filter(values, function (e) {
        return e !== 0;
    });

    return _.uniq(removed).length === removed.length;
}

function isSquareValid(squareRow, squareCol) {
    let square = [];
    let i;
    for (i = 0; i < 3; i++) {
        let j;
        for (j = 0; j < 3; j++) {
            square.push(grid[squareRow + i][squareCol + j]);
        }
    }

    if (DEBUG) console.info(`Checking if the square (${squareRow}, ${squareCol}) is valid, square: ${square}`);

    return isValid(square);
}


// -- intermediate functions ---
function isCellEmpty(row, col) {
    _checkBounds(row, col);

    return grid[row][col] === 0;
}

function isSquareIncludingValid(row, col) {
    _checkBounds(row, col);

    const squareRow = 3 * Math.floor(row / 3);
    const squareCol = 3 * Math.floor(col / 3);

    return isSquareValid(squareRow, squareCol);
}

function isRowValid(row) {
    _checkBounds(row, 1);

    if (DEBUG) console.info(`Checking if row ${row} is valid, row: ${grid[row]}`);

    return isValid(grid[row]);
}

function isColValid(col) {
    _checkBounds(1, col);

    let column = [];

    let i;
    for (i = 0; i < 9; i++) {
        column.push(grid[i][col]);
    }

    if (DEBUG) console.info(`Checking if col ${col} is valid, col: ${column}`);

    return isValid(column);
}

// --- basic functions
function isGameSolved() {
    let i;
    for (i = 0; i < 9; i++) {
        let j;
        for (j = 0; j < 9; j++) {
            if (grid[i][j] === 0) return false;
        }
    }

    return true;
}

function isMoveValid(row, col) {
    _checkBounds(row, col);

    return isRowValid(row) && isColValid(col) && isSquareIncludingValid(row, col);
}

function getNextEmptyCell() {
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            if (isCellEmpty(row, col)) return [row, col];
        }
    }

    console.error(`No more empty cells`);
    return undefined;
}

// --- necessary functions ---
function getValueAt(row, col) {
    _checkBounds(row, col);

    return grid[row][col];
}

function setValueAt(row, col, val) {
    _checkBounds(row, col);
    if (val < 1 || val > 9) console.error(`Attempted to set invalid value at (${row}, ${col}) to ${val}`);
    if (!isCellEmpty(row, col)) console.log(`Attempted to set already set call at (${row}, ${col})`);

    grid[row][col] = val;

    if (STEP_THROUGH) _update(row, col, val);
    if (DEBUG) console.info(`Set value at (${row}, ${col}) to ${val}`);
}

function removeValueAt(row, col) {
    _checkBounds(row, col);

    grid[row][col] = 0;

    if (STEP_THROUGH) _update(row, col, 0);
    if (DEBUG) console.info(`Removed value at (${row}, ${col})`);
}
