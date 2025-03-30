import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        watch: false,
        include: ["src/**/*.test.ts"],
        maxConcurrency: 1, // Avoid API throttling
        retry: 2,
        poolOptions: {
            threads: {
                maxThreads: 1,// Avoid API throttling
            },
        },
        sequence: {
            concurrent: false,
        },
        testTimeout: 20000,
    },
}); 