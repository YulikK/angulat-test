#!/usr/bin/env node

const { execSync } = require("child_process");

// Run lint fix for the entire project when TypeScript files are staged
try {
  execSync("ng lint --fix", { stdio: "inherit" });
} catch (error) {
  console.error("Linting failed:", error.message || error);
  process.exit(1);
}
