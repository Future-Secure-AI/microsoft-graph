import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.all,
  ...tseslint.configs.all,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "no-ternary": "off",
      "curly": "off",
      "no-inline-comments": "off",
      "sort-imports": "off",
      "one-var": "off",
      "no-console": "warn",
      "@typescript-eslint/max-params": "off",
      "@typescript-eslint/parameter-properties": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/member-ordering": "off",
    }
  },
];