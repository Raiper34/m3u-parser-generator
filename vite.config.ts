import {resolve} from 'path';
import {defineConfig} from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'm3uParserGenerator',
            fileName: 'm3u-parser-generator',
            formats: ['es', 'cjs', 'umd', 'iife'],
        },
    },
    test: {
        include: ["test/**/*.spec.ts"],
        coverage: {
            include: ["src/**"],
            reporter: ['html', 'lcov']
        },
    },
});