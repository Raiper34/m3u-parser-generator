import {defineConfig} from 'vitest/config'

export default defineConfig({
    plugins: [],
    test: {
        include: ["test/**/*.spec.ts"],
        coverage: {
            include: ["src/**"],
            reporter: ['html', 'lcov']
        },
    },
});