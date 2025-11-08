import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import vue from "@vitejs/plugin-vue";
import * as path from "node:path";

export default defineConfig({
  plugins: [tsconfigPaths(), vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // server: {
  //   port: 10000,
  //   strictPort: true,
  //   host: "0.0.0.0",
  // },
});
