const js = require("@eslint/js");
const globals = require("globals");
const reactRefresh = require("eslint-plugin-react-refresh");
const tseslint = require("typescript-eslint");

const currentDir = process.cwd();

module.exports = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
      },
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: currentDir,
      },
    },
    settings: {
      react: {
        version: "19",
      },
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      // Disable strict rules for smoother development
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "prefer-const": "off",
      "no-redeclare": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "convex/_generated/**"],
  }
);

