import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteCompression({
        verbose: true,
        disable: false,
        threshold: 102400,
        algorithm: 'gzip',
        ext: '.gz'
    })],
    build: {
        cssCodeSplit: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                assetFileNames: 'static/[ext]/[hash].[ext]',
                chunkFileNames: 'static/js/[hash].js',
                entryFileNames: 'static/js/[hash].js',
                manualChunks: (id: any): string => {
                    if (id.includes('node_modules')) {
                        return id.split('node_modules/')[1].split('/')[0];
                    }
                }
            }
        },
        minify: 'terser',
        cssMinify: 'lightningcss',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    },
    base: '/Enhance-for-Skland/'
});
