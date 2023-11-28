import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'yumechi Profile Site',
  tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.yumechi.work',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'yumechi', // Usually your GitHub org/user name.
  projectName: 'yumechi.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: 'ja',
  //   locales: ['ja', 'en'],
  //   path: 'i18n',
  //   localeConfigs: {
  //     ja: {
  //       label: '日本語',
  //       direction: 'ltr',
  //       htmlLang: 'ja-JP',
  //       calendar: 'gregory',
  //       path: 'ja',
  //     },
  //     en: {
  //       label: 'English',
  //       direction: 'ltr',
  //       htmlLang: 'en-US',
  //       calendar: 'gregory',
  //       path: 'en',
  //     },
  //   },
  // },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-V9X0W8MNKP',
        anonymizeIP: true,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'yumechi Profile Site',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Profile',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Site Contents',
          items: [
            {
              label: 'Profile',
              to: '/docs',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'SNS',
          items: [
            {
              label: 'X',
              href: 'https://twitter.com/__yumechi',
            },
            {
              label: 'Misskey @__yumechi@misskey.systems',
              href: 'https://misskey.systems/@__yumechi',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/yumechi',
            },
            {
              label: 'Speaker Deck',
              href: 'https://speakerdeck.com/yumechi',
            },
            {
              label: 'Wantedly',
              href: 'https://www.wantedly.com/id/motoki_hirao',
            },
          ],
        },
        {
          title: 'Blog(Japanese)',
          items: [
            {
              label: 'Hatena Blog',
              href: 'https://namonakimichi.hatenablog.com',
            },
            {
              label: 'Qiita',
              href: 'https://qiita.com/yumechi',
            },
            {
              label: 'Zenn',
              href: 'https://zenn.dev/yumechi',
            },
          ],
        },
        {
          title: 'Blog(English)',
          items: [
            {
              label: 'Dev.to',
              href: 'https://dev.to/yumechi',
            },
          ],
        },      ],
      copyright: `Copyright © ${new Date().getFullYear()} yumechi. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
