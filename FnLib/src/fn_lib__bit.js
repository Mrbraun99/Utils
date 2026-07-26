export class FnLib__Bit {
    static count(number) {
        let value = (typeof number == 'bigint') ? number : BigInt(number);
        let count = 0;

        while (value != 0n) {
            value &= value - 1n;
            count++;
        }

        return count;
    }

    static indexes(number) {
        let value = (typeof number == 'bigint') ? number : BigInt(number);
        const result = [];

        let index = 0;
        while (value != 0n) {
            if ((value & 1n) != 0n) {
                result.push(index);
            }
            value >>= 1n;
            index++;
        }

        return result;
    }

    static hasSingleOne(number) {
        const value = (typeof number == 'bigint') ? number : BigInt(number);
        return value > 0n && (value & (value - 1n)) == 0n;
    }
}