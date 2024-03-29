import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    optimizeDeps: {
      include: ['@emotion/react', '@emotion/styled', '@mui/icons-material', 'lodash','@mui/material/Tooltip', '@mui/material']
    },
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "/src"),
      },
    ],
  },
  
  define: {
        "process.env": {},
      },
  plugins: [react(), nodePolyfills()],
});



// export default defineConfig({
//   define: {
//     "process.env": {},
//   },
// });