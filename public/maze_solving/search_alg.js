searchAlg = dfs; // bfs or dfs
mapString = map5; // map1 ... map5

// available data structures:
// new BetterSet(); -> set (all elements are unique) -> use this for your list of visited states!
// new Queue(); -> first in first out
// new Stack(); -> first in last out

// available functions:
// getStartState(); -> the start coordinates
// isGoalState(coords); -> have we reached the end of the maze (coords is an array [x, y])
// getNeighbors(coords); -> gets all the valid coordinates we can go to nexgt (coords in an array [x, y]) (returns an array of coordinates [[x1, y1], [x2, y2], ...])

function bfs() {
    let toVisit = new Queue(); // stores an array: [coords, [path to here]]
    toVisit.add([getStartState(), [getStartState()]]); // our start state, and the path to get there (which is go to start state)

    let visited = new BetterSet();

    // while there's still more to visit
    while (toVisit.length() > 0) {

        let [currentCoords, currentPath] = toVisit.remove();

        // have we reached the goal
        if (isGoalState(currentCoords)) {
            return currentPath;
        }

        // have we visited the node already?
        if (visited.contains(currentCoords)) {
            continue;
        }

        // find neighbors
        let neighbors = getNeighbors(currentCoords);
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            
            // add neighbor to path
            let copyOfPath = copyArray(currentPath); // necessary to copy b/c javascript is a pass-by-reference language
            copyOfPath.push(currentCoords);

            toVisit.add([neighbor, copyOfPath]);
        }

        // say we have visited the currentCoord
        visited.add(currentCoords);

    }

    return undefined;
}

function dfs() {
    let toVisit = new Stack(); // stores an array: [coords, [path to here]]
    toVisit.add([getStartState(), [getStartState()]]); // our start state, and the path to get there (which is go to start state)

    let visited = new BetterSet();

    // while there's still more to visit
    while (toVisit.length() > 0) {

        let [currentCoords, currentPath] = toVisit.remove();

        // have we reached the goal
        if (isGoalState(currentCoords)) {
            return currentPath;
        }

        // have we visited the node already?
        if (visited.contains(currentCoords)) {
            continue;
        }

        // find neighbors
        let neighbors = getNeighbors(currentCoords);
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            // add neighbor to path
            let copyOfPath = copyArray(currentPath);
            copyOfPath.push(currentCoords);

            toVisit.add([neighbor, copyOfPath]);
        }

        // say we have visited the currentCoord
        visited.add(currentCoords);

    }

    return undefined;
}