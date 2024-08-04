/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@bowlise/eslint-config/base.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
}
