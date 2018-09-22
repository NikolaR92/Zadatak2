const EventEmiiter = require('events');
const Unit = require('./unit.js');
const numberOfUnits = require('./config.js');

function main() {
	try {
		if (numberOfUnits > 5 || numberOfUnits < 1) {
			throw new RangeError('Error main function, number of units must be between 1 and 5');
		}
		const arrayOfUnits = [];
		for (let i = 1; i <= numberOfUnits; i += 1) {
			arrayOfUnits.push(new Unit(`Unit_${i}`));
		}

		const emmiter = new EventEmiiter();

		arrayOfUnits.forEach(x => x.defending(emmiter));

		arrayOfUnits.forEach(x => x.begin(emmiter, arrayOfUnits));
		return 'Battle starts';
	} catch (error) {
		return `${error}`;
	}

// Promise.all([p1,p2]).then((msg)=> {console.log(msg)})
}

console.log(main());
