searchAlg = ucs; // ucs or astar

// todo: add more documentation

// available data structures:
// new BetterSet(); -> set (all elements are unique) -> use this for your list of visited states!
// new PriorityQueue

// available functions:
// getStartState(); -> the start coordinates
// isGoalState(coords); -> have we reached the end of the maze (coords is an array [x, y])
// getNeighbors(coords); -> gets all the valid coordinates we can go to nexgt (coords in an array [x, y]) (returns an array of coordinates [[x1, y1], [x2, y2], ...])

function ucs() {
    let toVisit = new PriorityQueue();
    // let toVisit = new Stack();
    
    // our start state, and the path to get there (which is go to start state)
    toVisit.add({
        coords: getStartState(),
        path: [getStartState()],
        cost: 0,
        heuristic_cost: 0 // the priority queue sorts by this
    });

    // a-star: heuristic_cost = cost + estimation of how far is left
    // usc: heuristic_cost = cost

    let visited = new BetterSet();

    // if toVisit.length() == 0, there is no path
    while (toVisit.length() > 0) {
        // give us the shortest possible path is
        let currentLoc = toVisit.remove();

        if (isGoalState(currentLoc.coords)) {
            return currentLoc.path;
        }

        if (visited.contains(currentLoc.coords)) {
            continue;
        }

        let neighbors = getNeighbors(currentLoc.coords);
        
        let i;
        for (i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            // neighbor.path = current path + neighbor
            neighbor.path = copyArray(currentLoc.path);
            neighbor.path.push(neighbor.coords);

            // cost = distance to current tile + distance to neighbor
            neighbor.cost = currentLoc.cost + neighbor.cost;

            // tell the priority queue to sort by the cost
            neighbor.heuristic_cost = neighbor.cost;

            // add the neighbor to the priority queue
            toVisit.add(neighbor);
        }

        visited.add(currentLoc.coords);
    }

    return undefined;
}

function ucs_old() {
    let toVisit = new PriorityQueue();
    
    // our start state, and the path to get there (which is go to start state)
    toVisit.add({
        coords: getStartState(),
        path: [getStartState()],
        cost: 0,
        heuristic_cost: 0 // the priority queue sorts by this
    })

    let visited = new BetterSet();

    // while there's still more to visit
    while (toVisit.length() > 0) {
        let current = toVisit.remove();

        // have we reached the goal
        if (isGoalState(current.coords)) {
            return current.path;
        }

        // have we visited the node already?
        if (visited.contains(current.coords)) {
            continue;
        }

        // find neighbors
        let neighbors = getNeighbors(current.coords);
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            
            // add neighbor to path
            neighbor.path = copyArray(current.path); // necessary to copy b/c javascript is a pass-by-reference language
            neighbor.path.push(neighbor.coords);

            neighbor.cost += current.cost;
            neighbor.heuristic_cost = neighbor.cost;

            toVisit.add(neighbor);
        }

        // say we have visited the currentCoord
        visited.add(current.coords);

    }

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

    // while there's still more to visit
    while (toVisit.length() > 0) {
        let current = toVisit.remove();

        // have we reached the goal
        if (isGoalState(current.coords)) {
            return current.path;
        }

        // have we visited the node already?
        if (visited.contains(current.coords)) {
            continue;
        }

        // find neighbors
        let neighbors = getNeighbors(current.coords);
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            
            // add neighbor to path
            neighbor.path = copyArray(current.path); // necessary to copy b/c javascript is a pass-by-reference language
            neighbor.path.push(neighbor.coords);

            neighbor.cost += current.cost;
            neighbor.heuristic_cost = neighbor.cost + manhattanDistance(neighbor.coords);

            toVisit.add(neighbor);
        }

        // say we have visited the currentCoord
        visited.add(current.coords);

    }

    return undefined;
}
