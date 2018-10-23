/** Class representing a unit of a soldier that can attack */
class Unit {
	/**
	 * Create a Unit
	 * @ param {string} name - Name of a Unit
	 */
	constructor(name) {
		this.nameVar = name;
		this.healthVar = 100;
		this.rechargeTimeVar = 1000;
		this.damageVar = 1;
		this.criticalChanceVar = 0;
	}

	/**
		* Method for recharging Unit attacks
		*
		* @param {Array.<Unit>} arrayOfUnits Array of enemy units
		*/
	recharge(arrayOfUnits) {
		const that = this;
		const methodCall = function methodCall() {
			that.attacks(arrayOfUnits);
		};

		setTimeout(methodCall, this.rechargeTime);
	}


	/** Method calculates attack damage and attacks defending unit.
	 * @param {Array.<Unit>} unitsDefending - Array of enemy units
	 */
	attack(unitsDefending) {
		unitsDefending.forEach((x) => { if (!(x instanceof Unit)) throw new TypeError('Class Unit, method attack, passed array its element are not instanceof Unit'); });
		const len = unitsDefending.length;
		const rand = Math.floor(Math.random() * (len));
		let { damage: damageOfUnit } = this;
		if (this.criticalChance > Math.floor(Math.random() * 101)) {
			damageOfUnit *= 2;
			console.log(`${this.name} attacks ${unitsDefending[rand].name} Critical Hit for ${damageOfUnit} damage`);
		} else {
			console.log(`${this.name} attacks ${unitsDefending[rand].name} for ${damageOfUnit} damage`);
		}
		unitsDefending[rand].health -= damageOfUnit;
		console.log(`${unitsDefending[rand].name} is hurt, health=${unitsDefending[rand].health}`);
		this.recharge(unitsDefending);
	}

	/** Method for checking if Unit i alive and for filtering dead enemy units
	 * @param {Array.<Unit> } arrayOfUnits - Array of enemy units
	 */
	attacks(arrayOfUnits) {
		/** Checking if each member of array is Unit. */
		arrayOfUnits.forEach((x) => { if (!(x instanceof Unit)) throw new TypeError('Class Unit, method attack, passed array its element are not instanceof Unit'); });


		let arrayOfUnits1 = arrayOfUnits.filter(unit => unit.name !== this.name);

		this.rechargeTime = this.health;
		this.damage = this.health;
		this.criticalChance = this.health;
		arrayOfUnits1 = arrayOfUnits1.filter(unit => unit.health > 0);
		if (this.health > 0 && arrayOfUnits1.length === 0) {
			console.log(`${this.name} is victorious`);
		} else if (this.health <= 0) {
			console.log(`${this.name} is dead`);
		} else {
			this.attack(arrayOfUnits1);
		}
	}

	/**
		* Get the name value
		* @return {string} The name value
		*/
	get name() { return this.nameVar; }

	/**
	 * Sets the name value
	 * @param {string} name- Name of the Unit
	 */
	set name(name) { this.nameVar = name; }

	/**
	 * Get the health value
	 * @return {number} The current health value
	 */
	get health() { return this.healthVar; }

	/**
	 * Sets the health value
	 * @param {number} health- New health value of Unit
	 */
	set health(health) { this.healthVar = health; }

	/**
	 * Get the recharge time value
	 * @return {number} The current recharge time
	 */
	get rechargeTime() { return this.rechargeTimeVar; }

	/**
	 * Sets the recharge time based on current health value
	 * @param {number} health - Current health value of Unit
	 */
	set rechargeTime(health) { this.rechargeTimeVar = 1000 * health / 100; }

	/**
	 * Get the attack damage value
	 * @return {number} Current attack damage value
	 */
	get damage() { return this.damageVar; }

	/**
	 * Sets the damage of Unit based on current health
	 * @param {number} health - Current health of Unit
	 */
	set damage(health) { this.damageVar = health / 100; }

	/**
	 * Get the critical chance for doing extra damag for Unit
	 * @return {number} Current critical chance value of Unit
	 */
	get criticalChance() { return this.criticalChanceVar; }

	/**
	 * Set critical chance of Unit based on current health
	 * @param {number} health - Current health of Unit
	 */
	set criticalChance(health) { this.criticalChanceVar = 10 - health / 10; }
}


module.exports = Unit;
