/** Class representing a unit of a soldier that can attack */
class Unit {
	/**
	 * Create a Unit
	 * @ param {string} name - Name of a Unit
	 */
	constructor(name) {
		this.props = {
			name,
			health: 100,
			rechargeTime: 1000,
			damage: 1,
			criticalChance: 0,
		};
	}

	/**
	 * Method for recharging Unit attacks
	 *
	 * @param {Array.<Unit>} arrayOfUnits Array of enemy units
	 */
	recharge(arrayOfUnits) {
		const methodCall = () => (
			this.attacks(arrayOfUnits));

		setTimeout(methodCall, this.rechargeTime);
	}

	/** Method for filtering dead enemy units and attacking remaining
	 * @param {Array.<Unit> } arrayOfUnits - Array of enemy units
	 */
	attacks(arrayOfUnits) {
		const arrayOfUnits1 = arrayOfUnits.filter(unit => unit.health > 0);
		if (this.health > 0 && arrayOfUnits1.length === 0) {
			console.log(`${this.name} is victorious`);
		} else if (this.health <= 0) {
			console.log(`${this.name} is dead`);
		} else {
			const len = arrayOfUnits1.length;
			const rand = Math.floor(Math.random() * (len));
			let { damage: damageOfUnit } = this;
			if (this.criticalChance > Math.floor(Math.random() * 101)) {
				damageOfUnit *= 2;
				console.log(`${this.name} attacks ${arrayOfUnits1[rand].name} Critical Hit for ${damageOfUnit} damage`);
			} else {
				console.log(`${this.name} attacks ${arrayOfUnits1[rand].name} for ${damageOfUnit} damage`);
			}
			arrayOfUnits1[rand].health -= damageOfUnit;
			console.log(`${arrayOfUnits1[rand].name} is hurt, health=${arrayOfUnits1[rand].health}`);
			this.recharge(arrayOfUnits1);
		}
	}

	/**
		* Get the name value
		* @return {string} The name value
		*/
	get name() { return this.props.name; }

	/**
	 * Get the health value
	 * @return {number} The current health value
	 */
	get health() { return this.props.health; }

	/**
	 * Sets the health value
	 * @param {number} health- New health value of Unit
	 */
	set health(health) { this.props.health = health; }

	/**
	 * Get the recharge time value
	 * @return {number} The current recharge time
	 */
	get rechargeTime() { return 1000 * this.props.health / 100; }

	/**
	 * Get the attack damage value
	 * @return {number} Current attack damage value
	 */
	get damage() { return this.props.health / 100; }

	/**
	 * Get the critical chance for doing extra damage for Unit
	 * @return {number} Current critical chance value of Unit
	 */
	get criticalChance() { return 10 - this.props.health / 10; }
}


module.exports = Unit;
