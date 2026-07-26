import { FnLib } from "../src/fn_lib.js";

test("FnLib.Bit.count()", () => {
    expect(FnLib.Bit.count(2)).toBe(1);
    expect(FnLib.Bit.count(5)).toBe(2);
    expect(FnLib.Bit.count(7)).toBe(3);
    expect(FnLib.Bit.count(255)).toBe(8);
});

test("FnLib.Bit.indexes()", () => {
    expect(FnLib.Bit.indexes(2)).toEqual([1]);
    expect(FnLib.Bit.indexes(5)).toEqual([0, 2]);
    expect(FnLib.Bit.indexes(7)).toEqual([0, 1, 2]);
    expect(FnLib.Bit.indexes(255)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
});

test("FnLib.Bit.hasSingleOne()", () => {
    expect(FnLib.Bit.hasOnlyOneBitSet(2)).toBe(true);
    expect(FnLib.Bit.hasOnlyOneBitSet(16)).toBe(true);
    expect(FnLib.Bit.hasOnlyOneBitSet(5)).toBe(false);
});
