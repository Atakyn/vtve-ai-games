function solveSudoku() {
    if (isGameSolved()) return true;

    const nextCell = getNextEmptyCell();
    const row = nextCell[0], col = nextCell[1];

    // make the move
    let value;
    for (value = 1; value <= 9; value++) {
        setValueAt(row, col, value);

        if (isMoveValid(row, col)) {
            const moveWorked = solveSudoku();
            if (moveWorked) return true;
        }

        removeValueAt(row, col);
    }

    return false;
}
