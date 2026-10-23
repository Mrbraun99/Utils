export class FnLib__Math {
	static mod(value, modulo) {
		return ((value % modulo) + modulo) % modulo;
	}

	static random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
