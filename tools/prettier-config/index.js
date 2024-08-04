import { fileURLToPath } from "url";

/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: "always",
  bracketSameLine: true,
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "preserve",
  quoteProps: "consistent",
  requirePragma: false,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
  ],
  tailwindFunctions: ["cn", "cva"],
  importOrder: [
    "<TYPES>",
    "",
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "",
    "^(next/(.*)$)|^(next$)",
    "",
    "^(expo(.*)$)|^(expo$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>^@voltig",
    "",
    "^@bowlise/(.*)$",
    "",
    "<TYPES>^[.|..|~]",
    "",
    "^~/",
    "",
    "^[../]",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.5.4",
  overrides: [
    {
      files: "*.json.hbs",
      options: {
        parser: "json",
      },
    },
    {
      files: "*.js.hbs",
      options: {
        parser: "babel",
      },
    },
  ],
};

export default config;