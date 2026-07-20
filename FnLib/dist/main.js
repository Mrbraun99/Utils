(() => {
  // src/fn_lib__math.js
  class FnLib__Math {
    static mod(value, modulo) {
      return (value % modulo + modulo) % modulo;
    }
  }

  // src/fn_lib__array1d.js
  class FnLib__Array1D {
    static create(size, fill = null) {
      return Array.from({ length: size }, (_, i) => typeof fill == "function" ? fill(i) : fill);
    }
    static _extreme(arr, fn, compare, indexes) {
      if (fn == null) {
        fn = (x) => x;
      }
      let extreme = fn(arr[0]);
      let index_list = indexes ? [0] : null;
      for (let i = 1;i < arr.length; i++) {
        const value = fn(arr[i]);
        if (compare(value, extreme)) {
          extreme = value;
          index_list = indexes ? [i] : null;
        } else if (indexes && value == extreme) {
          index_list.push(i);
        }
      }
      return indexes ? { value: extreme, indexes: index_list } : extreme;
    }
    static min(arr, fn = null, indexes = false) {
      return this._extreme(arr, fn, (a, b) => a < b, indexes);
    }
    static max(arr, fn = null, indexes = false) {
      return this._extreme(arr, fn, (a, b) => a > b, indexes);
    }
    static sum(arr, fn = null) {
      if (fn == null) {
        fn = (x) => x;
      }
      return arr.reduce((acc, e) => acc + Number(fn(e)), 0);
    }
    static same(arr, fn = null) {
      if (fn == null) {
        fn = (x) => x;
      }
      if (arr.length == 0) {
        return true;
      }
      const first = fn(arr[0]);
      return arr.every((e) => fn(e) == first);
    }
    static zipWith(fn, ...arrays) {
      return Array.from({ length: Math.min(...arrays.map((arr) => arr.length)) }, (_, i) => fn(...arrays.map((arr) => arr[i])));
    }
  }

  // src/fn_lib__array2d.js
  class FnLib__Array2D {
    static create(size, fill = null) {
      return Array.from({ length: size.y }, (_, y) => Array.from({ length: size.x }, (_2, x) => typeof fill == "function" ? fill(x, y) : fill));
    }
    static getSizeX(arr) {
      return arr[0]?.length ?? 0;
    }
    static getSizeY(arr) {
      return arr.length;
    }
    static _extreme(arr, fn, compare, indexes) {
      if (fn == null)
        fn = (x) => x;
      const sizeX = this.getSizeX(arr);
      const sizeY = this.getSizeY(arr);
      let extreme = fn(arr[0][0]);
      let index_list = indexes ? [{ x: 0, y: 0 }] : null;
      for (let y = 0;y < sizeY; y++) {
        for (let x = 0;x < sizeX; x++) {
          if (x == 0 && y == 0)
            continue;
          const value = fn(arr[y][x]);
          if (compare(value, extreme)) {
            extreme = value;
            index_list = indexes ? [{ x, y }] : null;
          } else if (indexes && value == extreme) {
            index_list.push({ x, y });
          }
        }
      }
      return indexes ? { value: extreme, indexes: index_list } : extreme;
    }
    static min(arr, fn = null, indexes = false) {
      return this._extreme(arr, fn, (a, b) => a < b, indexes);
    }
    static max(arr, fn = null, indexes = false) {
      return this._extreme(arr, fn, (a, b) => a > b, indexes);
    }
  }

  // src/fn_lib.js
  class FnLib {
    static Math = FnLib__Math;
    static Array1D = FnLib__Array1D;
    static Array2D = FnLib__Array2D;
  }

  // src/main.js
  globalThis.FnLib = FnLib;
})();
