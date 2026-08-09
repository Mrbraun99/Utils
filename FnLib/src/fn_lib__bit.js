export class FnLib__Bit {
    static count(number) {
        let count = 0;
        const [zero, one] = (typeof number === 'bigint') ? [0n, 1n] : [0, 1];

        while (number !== zero) {
            number &= number - one;
            count++;
        }

        return count;
    }

    static indexes(number) {
        const [zero, one] = (typeof number === 'bigint') ? [0n, 1n] : [0, 1];
        const result = [];

        let index = 0;
        while (number !== zero) {
            if ((number & one) !== zero) {
                result.push(index);
            }
            number >>= one;
            index++;
        }

        return result;
    }

    static hasOnlyOneBitSet(number) {
        const [zero, one] = (typeof number === 'bigint') ? [0n, 1n] : [0, 1];

        return number > zero && (number & (number - one)) === zero;
    }

    static set(number, index, bit = 1) {
        const [one, shift_index] = (typeof number === 'bigint') ? [1n, BigInt(index)] : [1, index];

        return bit == 1 ? number | (one << shift_index) : number & ~(one << shift_index);
    }
}