import { FnLib } from "../src/fn_lib.js";

test("FnLib.Array2D.create()", () => {
    expect(FnLib.Array2D.create({ x: 3, y: 2 }, (x, y) => x + y)).toEqual([
        [0, 1, 2],
        [1, 2, 3],
    ]);
});

test("FnLib.Array2D.getSizeX()", () => {
    expect(FnLib.Array2D.getSizeX([
        [1, 2, 3],
        [4, 5, 6],
    ])).toBe(3);
});

test("FnLib.Array2D.getSizeY()", () => {
    expect(FnLib.Array2D.getSizeY([
        [1, 2, 3],
        [4, 5, 6],
    ])).toBe(2);
});

test("FnLib.Array2D.min()", () => {
    expect(FnLib.Array2D.min([
        [8, 9, 2],
        [5, 2, 2],
        [4, 7, 6]
    ])).toBe(2);
    expect(FnLib.Array2D.min([
        [8, 9, 2],
        [5, 2, 2],
        [4, 7, 6]
    ], null, true)).toEqual({ "value": 2, "indexes": [{ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }] });
    expect(FnLib.Array2D.min([
        [8, 9, 2],
        [5, 2, 2],
        [4, 7, 6]
    ], v => -v,)).toBe(-9);
});

test("FnLib.Array2D.max()", () => {
    expect(FnLib.Array2D.max([
        [8, 8, 2],
        [5, 2, 2],
        [4, 8, 6]
    ])).toBe(8);
    expect(FnLib.Array2D.max([
        [8, 8, 2],
        [5, 2, 2],
        [4, 8, 6]
    ], null, true)).toEqual({ "value": 8, "indexes": [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 2 }] });
    expect(FnLib.Array2D.max([
        [8, 8, 2],
        [5, 2, 2],
        [4, 8, 6]
    ], v => -v,)).toBe(-2);
});

test("FnLib.Array2D.every()", () => {
    expect(FnLib.Array2D.every([
        [3, 3, 3],
        [3, 3, 3],
    ], v => v == 3)).toBe(true);
    expect(FnLib.Array2D.every([
        [3, 3, 3],
        [3, 7, 3],
    ], v => v == 3)).toBe(false);
});


test("FnLib.Array2D.some()", () => {
    expect(FnLib.Array2D.some([
        [1, 5, 9],
        [7, 7, 3],
    ], v => v == 4)).toBe(false);
    expect(FnLib.Array2D.some([
        [1, 5, 9],
        [7, 7, 3],
    ], v => v == 3)).toBe(true);
});
