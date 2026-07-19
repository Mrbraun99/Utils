export class FnLib__Array1D {
    static create(size, fill = null) {
        return Array.from({ length: size }, (_, i) => typeof fill == "function" ? fill(i) : fill);
    }

    static _extreme(arr, fn, compare, indexes) {
        if (fn == null) {
            fn = x => x;
        }

        let extreme = fn(arr[0]);
        let index_list = indexes ? [0] : null;

        for (let i = 1; i < arr.length; i++) {
            const value = fn(arr[i]);

            if (compare(value, extreme)) {
                extreme = value;
                index_list = indexes ? [i] : null;
            } else if (indexes && value == extreme) {
                index_list.push(i);
            }
        }

        return indexes ? { "value": extreme, "indexes": index_list } : extreme;
    }

    static min(arr, fn = null, indexes = false) {
        return this._extreme(arr, fn, (a, b) => a < b, indexes);
    }

    static max(arr, fn = null, indexes = false) {
        return this._extreme(arr, fn, (a, b) => a > b, indexes);
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

    static zipWith(fn, ...arrays) {
        return Array.from({ length: Math.min(...arrays.map(arr => arr.length)) }, (_, i) => fn(...arrays.map(arr => arr[i])));
    }
}