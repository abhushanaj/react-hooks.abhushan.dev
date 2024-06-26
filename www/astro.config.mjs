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
				},
				{
					tag: 'meta',
					attrs: {
						name: 'robots',
						content: 'noindex, follow'
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
						},
						{
							label: 'Changelog',
							link: 'https://github.com/abhushanaj/react-hooks.abhushan.dev/blob/main/react-hooks/CHANGELOG.md',
							attrs: {
								target: '_blank',
								rel: 'noreferrer, noopener'
							}
						}
					]
				},
				{
					label: 'Document Object Model (DOM)',
					autogenerate: { directory: '/hooks/dom' }
				},

				{
					label: 'Browser Object Model (BOM)',
					autogenerate: { directory: '/hooks/bom' }
				},
				{
					label: 'Window',
					autogenerate: { directory: '/hooks/window' }
				},
				{
					label: 'State',
					autogenerate: { directory: '/hooks/state' }
				},
				{
					label: 'User Interface (UI)',
					autogenerate: { directory: '/hooks/ui' }
				},
				{
					label: 'Effects and Lifecycles',
					autogenerate: { directory: '/hooks/effects-and-lifecycles' }
				},
				{
					label: 'Timers',
					autogenerate: { directory: '/hooks/timers' }
				},
				{
					label: 'Utilities',
					autogenerate: { directory: '/hooks/utilities' }
				}
			],
			components: {
				PageTitle: './src/components/docs/page-title/index.astro'
			}
		})
	]
});
