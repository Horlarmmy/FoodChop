// vite.config.js

import react from '@vitejs/plugin-react';

export default {
  plugins: [
    react()
  ],
  build: {
    // Ensure that Rollup can resolve "react-icons/fa"
    rollupOptions: {
      // Make sure "react-icons/fa" is not treated as an external dependency
      external: ['react-icons/fa']
    }
  }
};
