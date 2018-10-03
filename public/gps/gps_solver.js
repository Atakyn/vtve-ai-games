const maze_size = 33;
const mapString = map2;

const W = 701; // wall
const P = 803; // path
const T = 1757 // tree

const VP = 809; // visited path
const VT = 1857; // visited tree

const CP = 817; // completed path (actual path)
const CT = 2057; // completed tree

const ref = {
    'W': W,
    'P': P,
    'T': T
}

const type_to_cost = {};

type_to_cost[P] = 1;
type_to_cost[T] = 10;

const path_to_visted = {};

path_to_visted[P] = VP;
path_to_visted[VP] = CP;
path_to_visted[T] = VT;
path_to_visted[VT] = CT;

const config = {
    type: Phaser.AUTO,
    width: maze_size * 16,
    height: maze_size * 16,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

const game = new Phaser.Game(config);
let overlay;
let color_visited = [];
let _explored = new BetterSet();
let path;
let levelMap = [];
let goalX;
let goalY;

function preload () {
	this.load.image('game-tiles', 'tiles.png');
}

function create () {
    if (mapString === undefined) {
        console.error('no map specified');
    }

    mapString.split('\n').forEach(function (e) {
        const parsed = e.split('').map(function (r) {
            return ref[r];
        });
        levelMap.push(parsed);
    });

    goalX = levelMap.length - 2;
    goalY = levelMap[0].length - 2;

	const map = this.make.tilemap({data: levelMap, tileWidth: 16, tileHeight: 16});
	const tiles = map.addTilesetImage('game-tiles');

	overlay = map.createDynamicLayer(0, tiles, 0, 0);

    if (searchAlg === undefined) {
        console.error('no search algorithm specified');
    }

    console.info('started search function')
	path = searchAlg();
    console.info('search function finished execution')

    if (path === undefined) {
        console.error('search algorithm returned undefined (failed to find a path)');
    }
}

let frames = 0;
const frameRate = 1;

function update () {
    // coordinates of levelMap are flipped
	if (frames % frameRate === 0) {
        if (color_visited.length > 0) {
    		const tile = color_visited.shift();
            levelMap[tile[0]][tile[1]] = path_to_visted[levelMap[tile[0]][tile[1]]]
            overlay.putTileAt(levelMap[tile[0]][tile[1]], tile[1], tile[0]);
        } else {
            if (path !== undefined) {
                path.forEach(function(e) {                    
                    levelMap[e[0]][e[1]] = path_to_visted[levelMap[e[0]][e[1]]]
                    overlay.putTileAt(levelMap[e[0]][e[1]], e[1], e[0]);
                });
                path = undefined;
            }
        }
	}

	frames++;
}

function getCost(x, y) {
    return type_to_cost[levelMap[x][y]]
}

// --------------- useful functions -------------

function getStartState() {
	return [1, 1];
}

function isGoalState(coords) {
    if (!_explored.contains(coords)) {
        color_visited.push(coords);
        _explored.add(coords);
    }

	return coords[0] === goalX && coords[1] === goalY;
}

function getNeighbors(coords) {
    let [x, y] = coords;
	let result = [];

	if (levelMap[x + 1][y] !== W) {
        result.push({
            coords: [x + 1, y],
            cost: getCost(x + 1, y)
        });
    }

	if (levelMap[x][y + 1] !== W) {
        result.push({
            coords: [x, y + 1],
            cost: getCost(x, y + 1)
        });
    }

	if (levelMap[x - 1][y] !== W) {
        result.push({
            coords: [x - 1, y],
            cost: getCost(x - 1, y)
        });
    }

	if (levelMap[x][y - 1] !== W) {
        result.push({
            coords: [x, y - 1],
            cost: getCost(x, y - 1)
        });
    }

	return result;
}

function manhattanDistance(coords) {
    return Math.abs(coords[0] - goalX) + Math.abs(coords[1] - goalY);
}
