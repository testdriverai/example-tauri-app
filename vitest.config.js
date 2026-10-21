import { defineConfig } from "vitest/config";
import TestDriver from "testdriverai/vitest";

export default defineConfig({
  test: {
    // Sandboxes take time to boot and tear down. Both values are required.
    testTimeout: 480000,
    hookTimeout: 480000,
    reporters: ["default", TestDriver()],
    setupFiles: ["testdriverai/vitest/setup"],
  },
});
