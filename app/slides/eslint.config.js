import js from "@eslint/js";
import react from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
	js.configs.recommended, // ESLint's recommended rules
	prettierConfig, // Disable rules that conflict with Prettier
	{
		files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parser: tsParser, // Use TypeScript parser for TS files
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			react: react.plugins.react,
			"react-hooks": reactHooks,
			"jsx-a11y": jsxA11y,
			"@typescript-eslint": ts,
			prettier: prettier,
		},
		rules: {
			// React specific rules
			"react/react-in-jsx-scope": "off", // Not needed in React 17+
			"react/prop-types": "off", // Turn off if using TypeScript for prop types
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			// Accessibility rules
			"jsx-a11y/anchor-is-valid": "warn",
			// TypeScript specific rules (extend or override as needed)
			...ts.configs.recommended.rules, // Include recommended TypeScript rules
			// Prettier integration
			"prettier/prettier": "error",
		},
		settings: {
			react: {
				version: "detect", // Automatically detect React version
			},
		},
	},
];
