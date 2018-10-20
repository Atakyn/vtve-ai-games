searchAlg = bfs; // bfs or dfs
mapString = map2; // map1 ... map5

// available data structures:
// new BetterSet(); -> set (all elements are unique) -> use this for your list of visited states!
// new Queue(); -> first in first out
// new Stack(); -> first in last out

// available functions:
// getStartState(); -> the start coordinates
// isGoalState(coords); -> have we reached the end of the maze (coords is an array [x, y])
// getNeighbors(coords); -> gets all the valid coordinates we can go to nexgt (coords in an array [x, y]) (returns an array of coordinates [[x1, y1], [x2, y2], ...])

function bfs() {
    let toVisit = new Stack();

    // Queue -> [tile, path]
    //           [1, 1]
    toVisit.add([getStartState(), [getStartState()]]);

    // all of the tiles we have visted
    let visited = new BetterSet();

    // while we have not reached the (bottom right corner)
    while (true) {
        // toVisit.pop(), toVisit.deque()
        // remove the first thing from the queue
        let current = toVisit.remove();
        let currentLocation = current[0]; // [x, y]
        let currentPath = current[1];

        if (visited.contains(currentLocation)) {
            continue;
        }

        if (isGoalState(currentLocation)) {
            return currentPath;
        }

        let neighbors = getNeighbors(currentLocation);

        let i;
        for (i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            let copyOfPath = copyArray(currentPath);
            copyOfPath.push(neighbor);

            toVisit.add([neighbor, copyOfPath]);
        }

        visited.add(currentLocation);
    }


}

function dfs() {

}

function bfs_complete() {
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

function dfs_complete() {
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