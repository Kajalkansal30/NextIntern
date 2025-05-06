// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'), // Alias for cleaner imports
//     },
//   },
// });

// import path from 'path';
// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   build: {
//     rollupOptions: {
//       external: ['axios'], // Externalize axios or other dependencies
//     },
//   },
//   css: {
//     postcss: './postcss.config.cjs',
//   },
// });

// import path from 'path';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   build: {
//     rollupOptions: {
//       // No externalization needed for axios here
//     },
//   },
//   css: {
//     postcss: './postcss.config.cjs',
//   },
// });


import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss'; // ✅ FIX: Import from postcss, not vite
import { defineConfig } from 'vite';

// Use tailwind via postcss in CSS config, not directly as a plugin
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('axios')) return 'vendor-axios';
            return 'vendor';
          }
        },
      },
    },
  },
});

