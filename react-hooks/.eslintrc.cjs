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
	plugins: ['@typescript-eslint', 'react', 'vitest'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		ecmaFeatures: {
			jsx: true
		},
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname
	},
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
		'no-console': [2, { allow: ['warn', 'error'] }],
		// turn it off for time being while figuring why the act from @testing-library/react is typed as any
		'@typescript-eslint/no-unsafe-call': 'off'
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
