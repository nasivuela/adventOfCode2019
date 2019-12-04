const fs = require('fs');
const path = require('path');

const [lower, upper] = fs
	.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8')
	.split('-');

////

const notDecreasing = numbers => !numbers.some((n, i, arr) => n > arr[i + 1]);
const sameAdjacent = numbers => numbers.some((n, i, arr) => n === arr[i + 1]);
const strictSameAdjacent = numbers =>
	numbers.some(
		(n, i, arr) => n === arr[i + 1] && n !== arr[i - 1] && n !== arr[i + 2]
	);

const commonRules = [notDecreasing];

const checkRules = numbers => rule => rule(numbers);

const getPasswords = (min, max, rules) => {
	let count = 0;
	for (let i = min; i <= max; i++) {
		const numbers = i.toString().split('');
		if ([...commonRules, ...rules].every(checkRules(numbers))) {
			count++;
		}
	}
	return count;
};

////

console.assert(getPasswords(lower, upper, [sameAdjacent]) === 1665);
console.assert(getPasswords(lower, upper, [strictSameAdjacent]) === 1131);
