import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
process.env = { ...process.env, ...loadEnv('', process.cwd()) };
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    // proxy: {
    //   '/proxy': {
    //     target: process.env.VITE_APP_BACKEND_URL,
    //     changeOrigin: true,
    //     secure: false,
    //     ws: true,
    //     rewrite: path => path.replace(/^\/proxy/, ''),
    //     configure: (proxy, _options) => {
    //       proxy.on('error', (err, _req, _res) => {
    //         console.log('proxy error', err);
    //       });
    //       proxy.on('proxyReq', (proxyReq, req, _res) => {
    //         console.log('Sending Request to the Target:', req.method, req.url);
    //       });
    //       proxy.on('proxyRes', (proxyRes, req, _res) => {
    //         console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
    //       });
    //     },
    //   }
    // }

  },
  resolve: {
    alias: {
      '@@/': `${path.resolve(__dirname, 'src')}/`
    },

  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    minifyIdentifiers: false,
  },

})
