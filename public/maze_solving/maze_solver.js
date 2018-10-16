const maze_size = 33;
const W = 701; // wall
const P = 803; // path
const V = 809; // visited
const C = 813; // complete (actual path)
const S = 813; // start
const G = 951; // goal

const ref = {
    'W': W,
    'P': P
}

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
let startLoc = [1,1];
let goalLoc = [31,31];

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

    // place tiles
    overlay.putTileAt(S, startLoc[0], startLoc[1]);
    overlay.putTileAt(G, goalLoc[0], goalLoc[1]);
    
    //skip first tile
    color_visited.shift();

}

let frames = 0;
const frameRate = 1;

function update () {
    // coordinates of levelMap are flipped
	if (frames % frameRate === 0) {
        if (color_visited.length > 0) {
    		const tile = color_visited.shift();
            overlay.putTileAt(V, tile[1], tile[0]);
        } else {
            if (path !== undefined) {
                path.forEach(function(e) {
                    overlay.putTileAt(C, e[1], e[0]);
                });
                path = undefined;
            }
        }
	}

	frames++;
}

// --------------- useful functions -------------

function getStartState() {
	return [1, 1];
}

function isGoalState(coords) {
	return coords[0] === 31 && coords[1] === 31;
}

function getNeighbors(coords) {
    let [x, y] = coords;
	let result = [];

	if (levelMap[x + 1][y] === P) result.push([x + 1, y]);
	if (levelMap[x][y + 1] === P) result.push([x, y + 1]);
	if (levelMap[x - 1][y] === P) result.push([x - 1, y]);
	if (levelMap[x][y - 1] === P) result.push([x, y - 1]);

    if (!_explored.contains(coords)) {
        color_visited.push(coords);
        _explored.add(coords);
    }

	return result;
}