import { FnLib } from "../src/fn_lib.js";

test("FnLib.isNumber()", () => {
    expect(FnLib.isNumber(10)).toBe(true);
    expect(FnLib.isNumber(10.5)).toBe(true);
    expect(FnLib.isNumber(1e5)).toBe(true);
    expect(FnLib.isNumber("10")).toBe(false);
    expect(FnLib.isNumber([10])).toBe(false);
});

test("FnLib.isNumeric()", () => {
    expect(FnLib.isNumeric(10)).toBe(true);
    expect(FnLib.isNumeric(10.5)).toBe(true);
    expect(FnLib.isNumeric(1e5)).toBe(true);
    expect(FnLib.isNumeric("10")).toBe(true);
    expect(FnLib.isNumeric("A")).toBe(false);
    expect(FnLib.isNumeric([10])).toBe(false);
});

test("FnLib.isArray()", () => {
    expect(FnLib.isArray([])).toBe(true);
    expect(FnLib.isArray([10])).toBe(true);
    expect(FnLib.isArray(10)).toBe(false);
});