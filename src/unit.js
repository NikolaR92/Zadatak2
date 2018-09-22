const EventEmiiter = require('events');

class Unit {
	constructor(name) {
		this._name = name;
		this._health = 100;
		this._rechargeTime = 1000;
		this._damage = 1;
		this._criticalChance = 0;
	}

	// promis function
	// recharges Units attack
	// argument: unit - object of class Units
	// return: Promis object
	recharge(unit) {
		if (!(unit instanceof Unit)) throw new TypeError('Class Unit, method recharge, passed value is not instanceof Unit');
		return new Promise((resolve) => {
			for (let i = 0; i <= unit.rechargeTime; i += 1);
			resolve(`${unit.name} is ready to attack`);
		});
	}

	// Generator function that with promis functio generates async behaver
	// function waits for each attack to reacharge and calls attack functions
	// arguments: emmiter - object of class EventEmiiter
	//            arrayOfUnits - array of Units class objects
	* attacks(emmiter, arrayOfUnits) {
		if (!(emmiter instanceof EventEmiiter)) {
			throw new TypeError('Class Unit, method attack, passed value is not instanceof EventEmiiter');
		}
		arrayOfUnits.forEach((x) => { if (!(x instanceof Unit)) throw new TypeError('Class Unit, method attack, passed array its element are not instanceof Unit'); });


		let arrayOfUnits1 = arrayOfUnits.filter(unit => unit.name !== this.name);


		while (true) {
			this.rechargeTime = this.health;
			yield this.recharge(this);
			this.damage = this.health;
			this.criticalChance = this.health;
			arrayOfUnits1 = arrayOfUnits1.filter(unit => unit.health > 0);
			if (this.health <= 0 || arrayOfUnits1.length === 0) break;
			this.attack(arrayOfUnits1, emmiter);
		}
		if (this.health > 0) console.log(`${this.name} is victorious`);
		else {
			console.log(`${this.name} is dead`);
		}
	}

	//  method thats calls generator function and iterates through each value
	//  arguments: emmiter - object of class EventEmiiter
	//               arrayOfUnits - array of objects of Unit class
	//  return: Promise
	begin(emmiter, arrayOfUnits) {
		if (!(emmiter instanceof EventEmiiter)) {
			throw new TypeError('Class Unit, method begin, passed value is not instanceof EventEmiiter');
		}
		arrayOfUnits.forEach((x) => {
			if (!(x instanceof Unit)) throw new TypeError('Class Unit, method begin, passed array its element are not instanceof Unit');
		});


		const iterator = this.attacks(emmiter, arrayOfUnits);
		function iterate(iteration) {
			if (iteration.done) return iteration.value;
			const promise = iteration.value;
			return promise.then((x) => {
				console.log(x);
				iterate(iterator.next());
			});
		}
		return iterate(iterator.next());
	}

	// method calculates attack damage and message the defending unit about the attack
	// arguments: unitsDefending - array of objects units
	//            emmiter -  object of class EventEmiiter
	attack(unitsDefending, emmiter) {
		if (!(emmiter instanceof EventEmiiter)) {
			throw new TypeError('Class Unit, method attack, passed value is not instanceof EventEmiiter');
		}
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
		emmiter.emit(unitsDefending[rand].name, damageOfUnit, unitsDefending[rand]);
	}

	//  method that listens for attack event
	// arguments: emmiter - object of class EventEmiiter
	defending(emmiter) {
		if (!(emmiter instanceof EventEmiiter)) {
			throw new TypeError('Class Unit, method defending, passed value is not instanceof EventEmiiter');
		}
		emmiter.on(this.name, (damage, object) => {
			if (!Number.isFinite(damage)) throw new TypeError('Class Unit, method defending,first argument passed to method on is not a number');
			object.health -= damage;
			console.log(`${object.name} is hurt, health=${object.health}`);
		});
	}

	get name() { return this._name; }

	set name(name) { this._name = name; }

	get health() { return this._health; }

	set health(health) { this._health = health; }

	get rechargeTime() { return this._rechargeTime; }

	set rechargeTime(health) { this._rechargeTime = 1000 * health / 100; }

	get damage() { return this._damage; }

	set damage(health) { this._damage = health / 100; }

	get criticalChance() { return this._criticalChance; }

	set criticalChance(health) { this._criticalChance = 10 - health / 10; }
}

module.exports = Unit;
