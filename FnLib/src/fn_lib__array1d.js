export class FnLib__Array1D {
    static create(size, fill = null) {
        return Array.from({ length: size }, (_, i) => typeof fill == "function" ? fill(i) : fill);
    }

    static sum(arr, fn = null) {
        if (fn == null) {
            fn = x => x;

        }
        return arr.reduce((acc, e) => acc + Number(fn(e)), 0);
    };

    static same(arr, fn = null) {
        if (fn == null) {
            fn = x => x;
        }

        if (arr.length == 0) {
            return true;
        }

        const first = fn(arr[0]);

        return arr.every(e => fn(e) == first);
    }
}