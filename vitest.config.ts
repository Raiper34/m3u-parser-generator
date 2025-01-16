import {defineConfig} from 'vitest/config'

export default defineConfig({
    plugins: [],
    test: {
        coverage: {
            include: ["src/**"],
            reporter: ['lcov']
        },
    },
});