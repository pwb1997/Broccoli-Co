import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        legacy({
            targets: ['defaults', 'not IE 11'],
            modernPolyfills: ['es.object.from-entries', 'es.object.entries'],
        }),
    ],
    build: { polyfillModulePreload: true },
});
