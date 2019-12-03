const fs = require('fs');
const path = require('path');

const input = fs
	.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8')
	.split('\n');

////

const getFuel = mass => {
	const fuel = Math.floor(mass / 3) - 2;
	return fuel > 0 ? fuel : 0;
};

const getAccFuel = (mass) => {
	return mass > 0 
		? getFuel(mass) + getAccFuel(getFuel(mass)) 
		: 0;
};

const getTotalFuel = modulesMasses =>
	modulesMasses.reduce((acc, mass) => acc + getFuel(mass), 0);

const getTotalAccFuel = modulesMasses =>
	modulesMasses.reduce((acc, mass) => acc + getAccFuel(mass), 0);

///

console.assert(getTotalFuel(input) === 3346639);
console.assert(getTotalAccFuel(input) === 5017110);
