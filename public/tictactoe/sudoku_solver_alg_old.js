function doAITurn() {
    let row;
    let col;

    let best_row = -1;
    let best_col = -1;
    let best_score = -100;

    for (row = 0; row < 3; row++) {
        for (col = 0; col < 3; col++) {
            if (!isCellEmpty(row, col)) continue;

            makeAIMove(row, col);
            let score = minimax(1, false);
            removeValueAt(row, col);

            if (score > best_score) {
                best_row = row;
                best_col = col;
                best_score = score;
            }
        }
    }

    makeAIMove(best_row, best_col);
}

// our turn == true
function minimax(moves, turn) {
    const game_state = getGameState();
    if (game_state === TIE) return 0;
    if (game_state === AI_WON) return 10 - moves;
    if (game_state === PLAYER_WON) return -(10 - moves);

    let row;
    let col
    let best_score;
    if (turn) {
        best_score = -100;

        for (row = 0; row < 3; row++) {
            for (col = 0; col < 3; col++) {
                if (!isCellEmpty(row, col)) continue;

                makeAIMove(row, col);
                let score = minimax(moves + 1, false);
                removeValueAt(row, col);

                if (score > best_score) best_score = score;
            }
        }
    } else {
        best_score = 100;

        for (row = 0; row < 3; row++) {
            for (col = 0; col < 3; col++) {
                if (!isCellEmpty(row, col)) continue;

                makePlayerMove(row, col);
                let score = minimax(moves + 1, true);
                removeValueAt(row, col);

                if (score < best_score) best_score = score;
            }
        }
    }

    return best_score;
}
