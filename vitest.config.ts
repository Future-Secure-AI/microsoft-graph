import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        include: ["src/**/*.test.ts"],
        watch: true,
        poolOptions: {
            threads: {
                maxThreads: 2 // Avoid API throttling
            },
        },
    },
}); 