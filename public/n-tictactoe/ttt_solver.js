// generate board

const DEBUG = false; // whether to print debug information
const STEP_THROUGH = true; // whether to update the board as we go along
const PLAYER_SHAPE = 'X'; // player's shape, cannot be empty
const AI_SHAPE = 'O'; // AI's shape, cannot be empty

const PLAYER_WON = 0;
const AI_WON = 1;
const TIE = 2;
const NONE = 3;

const SIZE = 4;

let grid = [];

let i;
for (i = 0; i < SIZE; i++) {
    grid.push([]);
    for (j = 0; j < SIZE; j++) {
        grid[i].push('');
    }
}

const game_container = $('#ttt-container');

// generate the <tr> and <td> tags on the fly
for (i = 0; i < SIZE; i++) {
    const row = document.createElement('tr');
    row.id = `row-${i}`

    if (i === SIZE - 1) {
        row.className  = 'row-bottom';
    } else {
        row.className = 'row';
    }

    let j;
    for (j = 0; j < SIZE; j++) {
        const col = document.createElement('td');
        col.id = `cell-${i}-${j}`;

        if (j === SIZE - 1) {
            col.className = 'col-right';
        } else {
            col.className = 'col';
        }

        col.innerHTML = grid[i][j] || '';

        // create copy
        const r = i;
        const c = j;

        $(col).click(function() {
            makePlayerMove(r, c);
            doAITurn();

            // todo: show what won
        });
        $(row).append(col);
    }

    game_container.append(row);
}

// todo: idea: have a second board that shows what the minimax alg is trying out

// displayed the solved board
for (i = 0; i < SIZE; i++) {
    for (j = 0; j < SIZE; j++) {
        _update(i, j)
    }
}

// --- should never be called by user ---
function _checkBounds(row, col) {
    if (row < 0 || row > SIZE || col < 0 || col > SIZE)
        console.error(`Attempted to access invalid cell (${row}, ${col})`);
}

function _update(row, col, val) {
    const cell = `cell-${row}-${col}`;

    setTimeout(function() {
        document.getElementById(cell).innerHTML = val || grid[row][col] || '';
    }, 0);

    // Change color of the elements that are modified
    //if(document.getElementById(cell).innerHTML == val || document.getElementById(cell).innerHTML == ''){
    //    document.getElementById(cell).classList.add('highlight'); // The highlight color can be changed in the sudoku_solver css file
    //}
}

// --- basic functions ---
function getGameState() {
    if (isTie()) return TIE;

    // check rows
    let i;
    let j;

    for (i = 0; i < SIZE; i++) {
        if (grid[i][0] === '') break;

        const curr = grid[i][0];
        let end = true;

        for (j = 0; j < SIZE; j++) {
            if (curr !== grid[i][j]) {
                end = false;
                break;
            }
        }

        if (end) return getType(curr);
    }

    // check cols
    for (i = 0; i < SIZE; i++) {
        if (grid[0][i] === '') break;

        const curr = grid[0][i];
        let end = true;

        for (j = 0; j < SIZE; j++) {
            if (curr !== grid[i][j]) {
                end = false;
                break;
            }
        }

        if (end) return getType(curr);
    }

    // check diags 

    let curr = grid[0][0];
    let end = true;

    if (curr !== '') {
        for (i = 0; i < SIZE; i++) {
            if (curr !== grid[i][i]) {
                end = false;
                break;
            }
        }

        if (end) return getType(curr);
    }

    curr = grid[0][SIZE - 1];
    end = true;

    if (curr !== '') {
        for (i = 0; i < SIZE; i++) {
            if (curr !== grid[i][SIZE - i - 1]) {
                end = false;
                break;
            }
        }

        if (end) return getType(curr);
    }


    return NONE;
}

function getType(e) {
    if (e === PLAYER_SHAPE) return PLAYER_WON;
    else if (e === AI_SHAPE) return AI_WON;
    
    console.trace();
    console.error(`Unknown shape ${e} in board`);
}

function isTie() {
    let i;
    for (i = 0; i < SIZE; i++) {
        let j;
        for (j = 0; j < SIZE; j++) {
            if (grid[i][j] !== '') return false;
        }
    }

    return true;
}

// --- necessary functions ---
function getValueAt(row, col) {
    _checkBounds(row, col);

    return grid[row][col];
}

function setValueAt(row, col, val) {
    _checkBounds(row, col);
    if (val !== PLAYER_SHAPE && val !== AI_SHAPE) console.error(`Attempted to set invalid value at (${row}, ${col}) to ${val}`);
    if (!isCellEmpty(row, col)) console.error(`Attempted to set already set call at (${row}, ${col})`);

    grid[row][col] = val;

    if (STEP_THROUGH) _update(row, col, val);
    if (DEBUG) console.info(`Set value at (${row}, ${col}) to ${val}`);
}

function makePlayerMove(row, col) {
    setValueAt(row, col, PLAYER_SHAPE);
}

function makeAIMove(row, col) {
    setValueAt(row, col, AI_SHAPE);
}

function removeValueAt(row, col) {
    _checkBounds(row, col);

    if (grid[row][col] === '') console.error(`Attempted to remove value at already empty cell (${row}, ${col})`);

    grid[row][col] = '';

    if (STEP_THROUGH) _update(row, col, 0);
    if (DEBUG) console.info(`Removed value at (${row}, ${col})`);
}

function isCellEmpty(row, col) {
    _checkBounds(row, col);

    return grid[row][col] === '';
}

