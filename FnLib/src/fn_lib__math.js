export class FnLib__Math {
    static mod(value, modulo) {
        return ((value % modulo) + modulo) % modulo;
    }

    static random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static equalFloat(a, b, epsilon = 1e-4) {
        return Math.abs(a - b) < epsilon;
    }

    static factorial(n) {
        let result = 1;

        for (let i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }
}
