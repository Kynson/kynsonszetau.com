/**
 * @type { import('snowpack').SnowpackUserConfig } 
 */
const config = {
  root: 'src',
  alias: {
    '@components/': './src/components'
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
    ]
  ],
  packageOptions: {
    knownEntrypoints: ['@roxi/routify/runtime/buildRoutes']
  },
  devOptions: {
    open: 'none',
    port: 5000,
  },
  buildOptions: {
    out: 'public',
  }
}

export default config;