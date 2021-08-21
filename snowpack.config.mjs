/**
 * @type { import('snowpack').SnowpackUserConfig } 
 */
const config = {
  root: 'src',
  alias: {
    '@components/': './src/components',
    '@stores/': './src/stores'
  },
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html'
    }
  ],
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  optimize: {
    target: 'esnext',
    splitting: true,
    bundle: true,
    treeshake: true
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-postcss',
    [
      '@snowpack/plugin-optimize',
      {
        preloadModules: true
      }
    ],
    [
      './plugins/pages-css-bundler.js',
      {
        target: 'main.css'
      }
    ]
  ],
  devOptions: {
    open: 'none',
    port: 5000,
  },
  buildOptions: {
    out: 'public',
  }
}

export default config;