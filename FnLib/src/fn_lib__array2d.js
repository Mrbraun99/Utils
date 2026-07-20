export class FnLib__Array2D {
    static create(size, fill = null) {
        return Array.from({ length: size.y }, (_, y) => Array.from({ length: size.x }, (_, x) => typeof fill == "function" ? fill(x, y) : fill));
    }

    static getSizeX(arr) {
        return arr[0]?.length ?? 0;
    }

    static getSizeY(arr) {
        return arr.length;
    }

    static _extreme(arr, fn, compare, indexes) {
        if (fn == null) fn = x => x;

        const sizeX = this.getSizeX(arr);
        const sizeY = this.getSizeY(arr);

        let extreme = fn(arr[0][0]);
        let index_list = indexes ? [{ x: 0, y: 0 }] : null;

        for (let y = 0; y < sizeY; y++) {
            for (let x = 0; x < sizeX; x++) {
                if (x == 0 && y == 0) continue;

                const value = fn(arr[y][x]);

                if (compare(value, extreme)) {
                    extreme = value;
                    index_list = indexes ? [{ x: x, y: y }] : null;
                } else if (indexes && value == extreme) {
                    index_list.push({ x: x, y: y });
                }
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
}