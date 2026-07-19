export class FnLib__Math {
    static mod(value, modulo) {
        return ((value % modulo) + modulo) % modulo;
    }
}