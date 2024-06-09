/** @type {import("prettier").Config} */
const config = {
	plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

	// General
	singleQuote: true,
	useTabs: true,
	tabWidth: 2,
	semi: true,
	printWidth: 120,
	trailingComma: 'none',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',

	// jsx specific
	quoteProps: 'as-needed',
	jsxSingleQuote: false,

	// tailwind specific
	tailwindAttributes: ['class:list'],
	tailwindFunctions: ['cn', 'clsx', 'cls'],

	// Astro specific
	astroAllowShorthand: false,
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro'
			}
		}
	],

	// sort import plugin options
	importOrder: [
		'^(react/(.*)$)|^(react$)',
		'<BUILTIN_MODULES>',
		'<THIRD_PARTY_MODULES>',
		'',
		'<TYPES>',
		'<TYPES>^[.]',
		'',
		'^@/components/(.*)$',
		'',
		'^@/utils/(.*)$',
		'',
		'^@/lib/(.*)$',
		'',
		'^[./]' // relative imports
	],
	importOrderParserPlugins: ['typescript', 'jsx'],
	importOrderTypeScriptVersion: '5.3.3'
};

export default config;
