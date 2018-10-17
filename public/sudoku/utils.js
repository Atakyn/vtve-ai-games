/*
 * Each element in a BetterSet is unique - there will never be 2 of the same element
 */
class BetterSet {
	constructor() {
		this.set = {};
	}

	contains(e) {
		return this.set[e] !== undefined;
	}

	add(e) {
		this.set[e] = true;
	}

	remove(e) {
		this.set[e] = undefined;
	}
}

/*
 * A Queue is a first-in-first-out data structure; the first element added is the first to be removed
 */
class Queue {
	constructor() {
		this.queue = [];
	}

	add(e) {
		this.queue.push(e);
	}

	remove() {
		return this.queue.shift();
	}

	isEmpty() {
		return this.queue.length === 0;
	}

	length() {
		return this.queue.length;
	}
}

/*
 * A Stack is a first-in-last-out data structure; the first element added is the last to be removed
 */
class Stack {
	constructor() {
		this.stack = [];
	}

	add(e) {
		this.stack.push(e);
	}

	remove() {
		return this.stack.pop();
	}

	isEmpty() {
		return this.stack.length === 0;
	}

	length() {
		return this.stack.length;
	}
}

/*
 * A PriorityQueue is sorted based on a function
 */
class PriorityQueue {
	constructor() {
		this.queue = [];
	}

	add(e) {
		this.queue.push(e);
		this.queue.sort(function(a, b) {
			return a.heuristic_cost - b.heuristic_cost;
		});
		// console.log(this.queue);
	}

	remove() {
		return this.queue.shift();
	}

	isEmpty() {
		return this.queue.length === 0;
	}

	length() {
		return this.queue.length;
	}
}

/*
 * Creates a copy of the current array
 */
function copyArray(e) {
	return e.slice();
}