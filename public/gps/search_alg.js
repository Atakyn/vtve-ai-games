searchAlg = ucs; // ucs or astar

// available data structures:
// new BetterSet(); -> set (all elements are unique) -> use this for your list of visited states!
// new PriorityQueue

// available functions:
// getStartState(); -> the start coordinates
// isGoalState(coords); -> have we reached the end of the maze (coords is an array [x, y])
// getNeighbors(coords); -> gets all the valid coordinates we can go to nexgt (coords in an array [x, y]) (returns an array of coordinates [[x1, y1], [x2, y2], ...])

function ucs() {
    let toVisit = new PriorityQueue();
    
    // our start state, and the path to get there (which is go to start state)
    toVisit.add({
        coords: getStartState(),
        path: [getStartState()],
        cost: 0,
        heuristic_cost: 0 // the priority queue sorts by this
    })

    let visited = new BetterSet();

    return undefined;
}

function astar() {
    let toVisit = new PriorityQueue();
    
    // our start state, and the path to get there (which is go to start state)
    toVisit.add({
        coords: getStartState(),
        path: [getStartState()],
        cost: 0,
        heuristic_cost: 0
    })

    let visited = new BetterSet();

    return undefined;
}
