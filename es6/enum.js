class EnumSymbol {
	constructor(name, {value, description = ''}) {
		this.symbol = Symbol.for(name);
		this.value = Number(value);
		this.description = String(description);
		Object.freeze(this);
	}
	get display() {
		return this.description || Symbol.keyFor(this.symbol);
	}
	toString() {
		return this.symbol;
	}
	valueOf() {
		return this.value;
	}
}

class Enum {
	constructor(constants) {
		Object.keys(constants).forEach(key => {
			if(!constants[key]) throw new TypeError('enum must contain a value');
			this[key] = new EnumSymbol(key, constants[key]);
		});
		Object.freeze(this);
	}
	symbols() {
		return [for (key of Object.keys(this)) this[key]];
	}
	keys() {
		return Object.keys(this);
	}
	contains(symbol) {
		if(!symbol instanceof EnumSymbol) return false;
		return this[Symbol.keyFor(symbol.symbol)] === symbol;
	}
}

export default Enum;