// necessary functions:
// makePlayerMove(row, col) -> have the player make a move at (row, col)
// makeAIMove(row, col) -> have the AI make a move at (row, col)
// removeValueAt(row, col) -> removes whatever was placed at (row, col)

// helper functions:
// getGameState() -> returns the state of the game,
//      one of: TIE, AI_WON, PLAYER_WON, NONE; where `NONE` reprsents the game isn't over

function doAITurn() {
    const state = getGameState();

    // is the game over?
    if (state !== NONE) return getScore(state, 0);

    let best_score = -10000000;
    let beta = 10000000;
    let best_row = -1;
    let best_col = -1;

    // CSP: variables
    let row, col;
    for (row = 0; row < 3; row++) {
        for (col = 0; col < 3; col++) {
            // CSP: constraints
            if (isCellEmpty(row, col)) {
                makeAIMove(row, col);

                const score = minValue(1, best_score, beta);
                if (score > best_score) {
                    best_row = row;
                    best_col = col;
                    best_score = score;
                }  

                removeValueAt(row, col);
            }
        }
    }

    // actually play the best move
    makeAIMove(best_row, best_col);
}

function maxValue(moves_made, alpha, beta) {
    const state = getGameState();

    // is the game over?
    if (state !== NONE) return getScore(state,moves_made);

    let best_score = -10000000;

    // CSP: variables
    let row, col;
    for (row = 0; row < 3; row++) {
        for (col = 0; col < 3; col++) {
            // CSP: constraints
            if (isCellEmpty(row, col)) {
                makeAIMove(row, col);
                best_score = Math.max(best_score, minValue(moves_made + 1, alpha, beta));
                removeValueAt(row, col);
                
                if (best_score >= beta) return best_score;
                alpha = Math.max(alpha, best_score);
            }
        }
    }

    return best_score;
}

function minValue(moves_made, alpha, beta) {
    const state = getGameState();

    // is the game over?
    if (state !== NONE) return getScore(state, moves_made);

    let best_score = +10000000;

    // CSP: variables
    let row, col;
    for (row = 0; row < 3; row++) {
        for (col = 0; col < 3; col++) {
            // CSP: constraints
            if (isCellEmpty(row, col)) {
                makePlayerMove(row, col);
                best_score = Math.min(best_score, maxValue(moves_made + 1));
                removeValueAt(row, col);

                if (best_score <= alpha) return best_score;
                beta = Math.min(beta, best_score);
            }
        }
    }

    return best_score;
}

function getScore(state, moves_made) {
    // AI_WON, PLAYER_WON, TIE
    if (state === AI_WON) return 10 - moves_made;
    if (state === PLAYER_WON) return -(10 - moves_made);
    if (state === TIE) return 0;

    console.error(`Unkown state ${state}`);
}
