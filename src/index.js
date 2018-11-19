/**
 * @fileOverview File for creating all the units and starting their attacks
 * @author Nikola Ristić
 *
 * @requires /src/config.js File with start configurations for program
 * @requires /src/unit.js File with unit class
 */

/** Variable for loading class Unit
 * @const
 * @type {Unit}
 */
const Unit = require('./unit.js');

/** Variable for storing number of unit to bee created
 * @const
 * @type {number}
 */
const numberOfUnits = require('./config.js');

/** Main function for creating Units and starting the battle
 * @returns {string}
 */
function main() {
	try {
		if (numberOfUnits > 5 || numberOfUnits < 1) {
			throw new RangeError('Error main function, number of units must be between 1 and 5');
		}
		const arrayOfUnits = [];
		for (let i = 1; i <= numberOfUnits; i += 1) {
			arrayOfUnits.push(new Unit(`Unit_${i}`));
		}
		arrayOfUnits.forEach(x => x.recharge(arrayOfUnits.filter(unit => unit.name !== x.name)));
		return 'Battle starts';
	} catch (error) {
		return `${error}`;
	}
}

console.log(main());
