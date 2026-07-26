import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        globals: true,
        passWithNoTests: true,
        coverage: {
            provider: 'v8',
            reporter: ['lcov', 'text'],
            reportsDirectory: './coverage',
            include: ['src/**/*.js', '!src/main.js'],

        },
    },
});