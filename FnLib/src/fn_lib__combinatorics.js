export class FnLib__Combinatorics {
	static encodePermutation(arr) {
		if (arr.length > 18) throw new RangeError("Permutation size cannot exceed 18");

		let code = 0;
		for (let i = 0; i < arr.length - 1; i++) {
			let smaller = 0;
			for (let j = i + 1; j < arr.length; j++) {
				if (arr[j] < arr[i]) smaller++;
			}

			code = code * (arr.length - i) + smaller;
		}

		return code;
	}

	static decodePermutation(code, size) {
		if (size > 18) throw new RangeError("Permutation size cannot exceed 18");

		const digits = new Array(size);
		for (let i = size - 1; i >= 0; i--) {
			const base = size - i;

			digits[i] = code % base;
			code = Math.floor(code / base);
		}

		const arr = new Array(size);

		let used = 0;
		for (let i = 0; i < size; i++) {
			let skip = digits[i];
			for (let j = 0; j < size; j++) {
				if ((used & (1 << j)) == 0) {
					if (skip == 0) {
						arr[i] = j;
						used |= 1 << j;
						break;
					}

					skip--;
				}
			}
		}

		return arr;
	}
}