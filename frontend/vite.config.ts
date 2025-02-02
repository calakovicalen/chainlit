import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    sourcemap: true
  },
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Existing aliases
      react: path.resolve(__dirname, './node_modules/react'),
      'usehooks-ts': path.resolve(__dirname, './node_modules/usehooks-ts'),
      sonner: path.resolve(__dirname, './node_modules/sonner'),
      lodash: path.resolve(__dirname, './node_modules/lodash'),
      recoil: path.resolve(__dirname, './node_modules/recoil'),

      '@chainlit/react-client': path.resolve(
        __dirname,
        '../libs/react-client/src/index.ts'
      )
    }
  }
});
