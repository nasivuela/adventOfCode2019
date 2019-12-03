const fs = require('fs');
const path = require('path');

const input = fs
	.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8')
	.split(',')
	.map(n => n * 1);

////

const restore = (arr, noun = 12, verb = 2) => {
	arr[1] = noun;
	arr[2] = verb;
	return arr;
};

const sum = (x, y) => y + x;
const multiply = (x, y) => y * x;

const magicSmoke = arr => {
	for (let i = 0; i < arr.length; i += 4) {
		const opcode = arr[i];
		if (opcode === 99) {
			break;
		} else {
			const a = arr[arr[i + 1]];
			const b = arr[arr[i + 2]];
			const c = opcode === 1 ? sum(a, b) : multiply(a, b);
			arr[arr[i + 3]] = c;
		}
	}
	return arr[0];
};

const magicSmoke2 = arr => {
	for (let noun = 0; noun < 100; noun++) {
		for (let verb = 0; verb < 100; verb++) {
			const output = magicSmoke(restore([...arr], noun, verb));
			if (output === 19690720) {
				return 100 * noun + verb;
			}
		}
	}
};

///

const output = magicSmoke(restore([...input]));
console.assert(output === 4484226);

const output2 = magicSmoke2(restore([...input]));
console.assert(output2 === 5696);
