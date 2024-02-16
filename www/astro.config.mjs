import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// just personal preference
	server: {
		port: 3000
	},
	site: 'https://react-hooks.abhushan.dev',
	integrations: [
		react(),
		tailwind({ applyBaseStyles: false }),
		// for starlight
		starlight({
			title: 'React Hooks',
			customCss: ['./src/tailwind.css'],
			social: {
				github: 'https://github.com/abhushanaj/react-hooks.abhushan.dev'
			},
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true
			},
			favicon: '/favicon.svg',
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon.ico',
						sizes: '32x32'
					}
				}
			],
			editLink: {
				baseUrl: 'https://github.com/abhushanaj/react-hooks.abhushan.dev/edit/main/'
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: 'Introduction',
							link: '/overview/introduction/'
						},
						{
							label: 'Installation',
							link: '/overview/installation/'
						}
					]
				},
				{
					label: 'DOM',
					autogenerate: { directory: '/hooks/dom' }
				}
			],
			components: {
				PageTitle: './src/components/docs/page-title/index.astro'
			}
		})
	]
});
