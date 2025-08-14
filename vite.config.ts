// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@graphql-typed-document-node/core": path.resolve(
        __dirname,
        "node_modules/@graphql-typed-document-node/core/index.js"
      ),
    },
  },
});
