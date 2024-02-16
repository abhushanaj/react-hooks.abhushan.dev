import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-1': 'linear-gradient(330deg,var(--colors-purple) 0,var(--colors-indigo) 100%)'
			}
		}
	},
	plugins: [starlightPlugin()]
};

export default config;
