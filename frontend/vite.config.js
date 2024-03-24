// vite.config.js

import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  build: {
    // You can add custom Rollup options here
    // For example, to customize the output directory:
    outDir: 'dist',
    // Or to configure external dependencies:
    rollupOptions: {
      external: ['react', 'react-dom', 'react-icons/fa'],
    },
  },
};
