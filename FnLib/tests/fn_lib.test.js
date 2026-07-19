import { FnLib } from "../src/fn_lib.js";

test("FnLib.Math.mod()", () => {
    expect(FnLib.Math.mod(5, 3)).toBe(2);
    expect(FnLib.Math.mod(-2, 5)).toBe(3);
});

test("FnLib.Array1D.create()", () => {
    expect(FnLib.Array1D.create(5)).toEqual([null, null, null, null, null]);
    expect(FnLib.Array1D.create(4, 5)).toEqual([5, 5, 5, 5]);
    expect(FnLib.Array1D.create(6, i => Math.pow(2, i))).toEqual([1, 2, 4, 8, 16, 32]);
});

test("FnLib.Array1D.min()", () => {
    expect(FnLib.Array1D.min([6, 1, 7, 8, 1, 4, 9, 9, 5, 4, 1, 1, 2, 3])).toBe(1);
    expect(FnLib.Array1D.min([6, 1, 7, 8, 1, 4, 9, 9, 5, 4, 1, 1, 2, 3], null, true)).toEqual({ "value": 1, "indexes": [1, 4, 10, 11] });
    expect(FnLib.Array1D.min([{ a: 5 }, { a: 4 }, { a: 7 }, { a: 3 }], e => e.a)).toBe(3);
});

test("FnLib.Array1D.max()", () => {
    expect(FnLib.Array1D.max([5, 6, 3, 7, 4, 1, 6, 7, 7, 5, 7])).toBe(7);
    expect(FnLib.Array1D.max([5, 6, 3, 7, 4, 1, 6, 7, 7, 5, 7], null, true)).toEqual({ "value": 7, "indexes": [3, 7, 8, 10] });
    expect(FnLib.Array1D.max([{ a: 7 }, { a: 1 }, { a: 8 }, { a: 9 }], e => e.a)).toBe(9);
});

test("FnLib.Array1D.sum()", () => {
    expect(FnLib.Array1D.sum([1, 2, 3, 4, 5])).toBe(15);
    expect(FnLib.Array1D.sum([{ a: 4 }, { a: 5 }], e => e.a)).toBe(9);
});

test("FnLib.Array1D.same()", () => {
    expect(FnLib.Array1D.same([1, 1, 0, 1, 1, 1])).toBe(false);
    expect(FnLib.Array1D.same([2, 2, 2])).toBe(true);
    expect(FnLib.Array1D.same([{ a: 4 }, { a: 4 }], e => e.a)).toBe(true);
    expect(FnLib.Array1D.same([{ a: 4 }, { a: 5 }], e => e.a)).toBe(false);
});

test("FnLib.Array1D.zipWith()", () => {
    expect(FnLib.Array1D.zipWith((a, b, c) => a + b + c, [1, 2, 3, 4], [10, 20, 30, 40], [100, 200, 300, 400])).toEqual([111, 222, 333, 444]);
});