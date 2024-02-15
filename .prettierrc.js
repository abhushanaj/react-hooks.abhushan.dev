/** @type {import("prettier").Config} */
const config = {
	// we still need to add the `prettier-plugin-astro` in the script, due to upstream pnpm issue as mentioned on astro docs
	// Reference: https://docs.astro.build/en/editor-setup/#prettier

	plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-astro'],

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
