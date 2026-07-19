import { FnLib } from "../src/fn_lib.js";

test("FnLib.Math.mod()", () => {
    expect(FnLib.Math.mod(5, 3)).toBe(2);
    expect(FnLib.Math.mod(-2, 5)).toBe(3);
});