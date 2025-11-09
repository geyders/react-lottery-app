import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // 🔇 Вимикає warnings з node_modules (Bootstrap Sass)
        quietDeps: true,

        // 🔧 Можеш також задати глобальні змінні, якщо треба
        additionalData: `
          @use "sass:color";
          @use "sass:math";
        `,
      },
    },
  },
});
