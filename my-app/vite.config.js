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
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import InjectCSS from '@itsy/vite-css-inject';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    InjectCSS(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),  // Added alias for tests
    },
  },
  build: {
    rollupOptions: {
      // No externalization needed for axios here
    },
  },
  css: {
    postcss: './postcss.config.cjs',
  },
});
