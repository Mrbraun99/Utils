import { FnLib__Math } from "./fn_lib__math.js";
import { FnLib__Array1D } from "./fn_lib__array1d.js";
import { FnLib__Array2D } from "./fn_lib__array2d.js";
import { FnLib__Bit } from "./fn_lib__bit.js";

export class FnLib {
    static Math = FnLib__Math;
    static Array1D = FnLib__Array1D;
    static Array2D = FnLib__Array2D;
    static Bit = FnLib__Bit;

    static isNumber(value) {
        return Number.isFinite(value);
    }

    static isNumeric(value) {
        return (typeof value == "number" && Number.isFinite(value)) || (typeof value == "string" && value.trim() != "" && Number.isFinite(Number(value)));
    }

    static isArray(value) {
        return Array.isArray(value);
    }
}