import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  // just personal preference
  server: {
    port: 3000,
  },
  integrations: [
    starlight({
      title: 'React Hooks',
      social: {
        github: 'https://github.com/abhushanaj/react-hooks.abhushan.dev',
      },
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
            sizes: '32x32',
          },
        },
      ],
      editLink: {
        baseUrl:
          'https://github.com/abhushanaj/react-hooks.abhushan.dev/edit/main/',
      },
      sidebar: [
        // {
        //   label: 'Overview',
        //   items: [
        //     // Each item here is one entry in the navigation menu.
        //     { label: 'Example Guide', link: '/guides/example/' },
        //   ],
        // },
        {
          label: 'Overview',
          autogenerate: { directory: 'overview' },
        },
      ],
    }),
  ],
});
