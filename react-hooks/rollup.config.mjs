import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

import pkgJson from './package.json' assert { type: 'json' };

const devDeps = Object.keys(pkgJson.devDependencies);
const peerDeps = Object.keys(pkgJson.peerDependencies);

const externalDeps = [...devDeps, ...peerDeps];

/** @type {import('rollup').RollupOptions} */
const config = [
	// Unminified Bundle
	{
		input: 'src/index.ts',
		external: externalDeps,
		output: [
			{
				file: 'dist/esm/index.js',
				format: 'esm',
				sourcemap: true
			},
			{
				file: 'dist/cjs/index.js',
				format: 'cjs',
				sourcemap: true
			}
		],
		plugins: [typescript({ tsconfig: './tsconfig.json' }), resolve(), commonjs()]
	},
	// Minified Bundle
	{
		input: 'src/index.ts',
		external: externalDeps,
		output: [
			{
				file: 'dist/esm/index.min.js',
				format: 'esm',
				sourcemap: true
			},
			{
				file: 'dist/cjs/index.min.js',
				format: 'cjs',
				sourcemap: true
			}
		],
		plugins: [typescript({ tsconfig: './tsconfig.json' }), resolve(), commonjs(), terser()]
	},
	// Declaration Bundle
	{
		input: 'src/index.ts',
		external: externalDeps,
		output: [
			{
				file: 'dist/types/index.d.ts'
			}
		],
		plugins: [
			typescript({
				tsconfig: './tsconfig.json',
				declaration: true,
				declarationMap: true,
				declarationDir: 'dist/types'
			})
		]
	}
];

export default config;
