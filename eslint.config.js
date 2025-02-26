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
      "no-magic-numbers": "off",
      "capitalized-comments": "off",
      "sort-keys": "off",
      "no-console": "warn",
      "@typescript-eslint/max-params": "off",
      "@typescript-eslint/parameter-properties": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      '@typescript-eslint/class-methods-use-this': "off",
      '@typescript-eslint/naming-convention': "off",
      '@typescript-eslint/no-unsafe-type-assertion': "off",
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"]
    }
  },
];