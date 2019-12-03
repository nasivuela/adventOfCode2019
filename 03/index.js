const fs = require('fs');
const path = require('path');

const input = fs
	.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8')
	.split('\n')
	.map(l => l.split(',').map(i => ({ dir: i[0], steps: i.substring(1) * 1 })));

////

const getPositions = wire => {
	const positions = new Map();
	let x = 0,
		y = 0,
		count = 0;
	for (const w of wire) {
		const { dir, steps } = w;
		for (let s = 0; s < steps; s++) {
			if (dir === 'R') {
				x += 1;
			} else if (dir === 'L') {
				x -= 1;
			} else if (dir === 'U') {
				y += 1;
			} else if (dir === 'D') {
				y -= 1;
			}
			const key = `${x},${y}`;
			count++;
			if (!positions.has(key)) {
				positions.set(key, count);
			}
		}
	}
	return positions;
};

const program1 = ([wire1, wire2]) => {
	const p1 = getPositions(wire1);
	const p2 = getPositions(wire2);

	let result;
	for (var key of p1.keys()) {
		if (p2.has(key)) {
			const cross = key
				.split(',')
				.map(Number)
				.reduce((acc, n) => acc + Math.abs(n), 0);
			result = !result || result > cross ? cross : result;
		}
	}
	return result;
};

const program2 = ([wire1, wire2]) => {
	const p1 = getPositions(wire1);
	const p2 = getPositions(wire2);

	let cross = [];

	for (var [key, value] of p1) {
		if (p2.has(key)) {
			cross.push(value + p2.get(key));
		}
	}

	return cross.reduce((acc, d) => (acc > d ? d : acc));
};

////

console.assert(program1(input), 1195);
console.assert(program2(input), 91518);
