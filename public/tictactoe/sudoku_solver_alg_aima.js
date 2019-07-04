function doAITurn() {

    function max_value() {
        const state = getGameState();
        if (state != NONE) return utility(state);

        v = -100000;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!isCellEmpty(row, col)) continue;

                makeAIMove(row, col);
                v = Math.max(v, min_value());
                removeValueAt(row, col);
            }
        }

        return v;
    }

    function min_value() {
        const state = getGameState();
        if (state != NONE) return utility(state);

        v = 100000;
        
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!isCellEmpty(row, col)) continue;

                makeAIMove(row, col);
                v = Math.min(v, max_value());
                removeValueAt(row, col);
            }
        }

        return v;
    }

    let best_row, best_col;
    let best_v = -100000;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (!isCellEmpty(row, col)) continue;

            makePlayerMove(row, col);

            const v = min_value();
            console.log(v);
            if (best_v < v) {
                best_row = row;
                best_col = col;
                best_v = v;
            }

            removeValueAt(row, col);
        }
    }

    makeAIMove(best_row, best_col);
}

function utility(state) {
    if (state === AI_WON) return +1;
    if (state === PLAYER_WON) return -1;
    if (state === TIE) return 0;

    console.error(`Unknown state ${state}`);
}
