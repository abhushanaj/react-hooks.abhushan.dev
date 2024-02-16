/** @type {import('eslint').Linter.Config} */
const config = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'plugin:react/jsx-runtime',
		'prettier'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		ecmaFeatures: {
			jsx: true
		},
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname
	},
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_'
			}
		],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'no-console': [2, { allow: ['warn', 'error'] }]
	},
	settings: {
		react: {
			version: 'detect'
		},
		'import/extensions': ['.ts', '.tsx'],
		'import/resolver': {
			node: {
				extensions: ['.ts', '.tsx']
			}
		}
	},
	ignorePatterns: ['dist/**', 'node_modules/**', '.eslintrc.cjs', 'rollup.config.mjs'],

	overrides: [
		{
			files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
			plugins: ['vitest'],
			extends: ['plugin:vitest/recommended', 'plugin:testing-library/react']
		}
	]
};

module.exports = config;
