import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ["src/http/controller/**", "./src/vitest-enviroments/prisma.ts"],
    ],
    dir: "src",
  },
});
