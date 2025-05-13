import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/my-element.ts",
            formats: ["es"],
        },
        outDir: "../App_Plugins/rick-and-morty-dashboard",
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/],
        },
    },
    base: "/App_Plugins/rick-and-morty-dashboard/",
});