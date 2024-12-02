import globals from "globals";
// import { Linter } from "eslint";
import svelteParser from "svelte-eslint-parser";
import sveltePlugin from "eslint-plugin-svelte";

/** @type {Linter.FlatConfig[]} */
export default [
  {
    // Define patterns for files and directories to ignore during linting.
    ignores: [
      "**/node_modules/**", 
      "**/.svelte-kit/**",  
      "**/vite.config.js",  
      "**/postcss.config.js", 
      "**/svelte.config.js", 
      "**/build/**",    
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021, // Use ECMAScript 2021 features (e.g., modern syntax).
        sourceType: "module", // Specify ES modules for import/export.
        extraFileExtensions: [".svelte"], // Ensure `.svelte` files are processed.
      },
      globals: globals.browser, // Enable global browser variables like `window` and `document`.
    },
    rules: {
      "no-unused-vars": ["warn"], // Warn about variables declared but not used.
      "no-console": "off", // Allow the use of `console.log` and similar statements.
      "indent": ["error", 2], // Enforce 2-space indentation.
    },
  },
  {
    // Apply specific configurations for `.svelte` files.
    files: ["*.svelte"],
    languageOptions: {
      parser: svelteParser, // Use the Svelte parser for these files.
    },
    plugins: {
      svelte: sveltePlugin, // Enable the official Svelte plugin.
    },
    rules: {
      "svelte/no-unused-class-name": ["warn"], // Warn about unused class names in `.svelte` files.
      "svelte/valid-prop-naming": ["error"], // Enforce valid property naming conventions in `.svelte` components.
    },
  },
  {
    // Apply specific configurations for JavaScript and TypeScript files.
    files: ["*.js", "*.ts"],
    rules: {
      "no-unused-vars": ["warn"], // Warn about unused variables.
      "no-console": "off", // Allow console statements.
      "indent": ["error", 2], // Enforce 2-space indentation.
    },
  },
  {
    // Apply specific configurations for server-side SvelteKit files (`+page.server.js`).
    files: ["**/+page.server.js"],
    rules: {
      "indent": ["error", 4], // Enforce 4-space indentation for these files.
    },
  },
];
