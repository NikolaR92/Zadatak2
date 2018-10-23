const Unit = require('./unit.js');
const numberOfUnits = require('./config.js');

/** Main function for creating Units and starting the battele */
function main() {
	try {
		if (numberOfUnits > 5 || numberOfUnits < 1) {
			throw new RangeError('Error main function, number of units must be between 1 and 5');
		}
		const arrayOfUnits = [];
		for (let i = 1; i <= numberOfUnits; i += 1) {
			arrayOfUnits.push(new Unit(`Unit_${i}`));
		}
		arrayOfUnits.forEach(x => x.recharge(arrayOfUnits));
		return 'Battle starts';
	} catch (error) {
		return `${error}`;
	}
}

console.log(main());
