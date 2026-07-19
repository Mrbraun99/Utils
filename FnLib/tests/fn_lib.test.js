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