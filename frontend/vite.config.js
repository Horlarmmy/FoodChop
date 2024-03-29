// vite.config.js

import react from '@vitejs/plugin-react';

export default {
  plugins: [
    react()
  ],
  build: {
    rollupOptions: {
      // Specify external dependencies to prevent Rollup from bundling them
      external: ['react-icons']
    }
  }
};
