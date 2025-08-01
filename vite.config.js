import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
  assetsInclude: ['**/*.svg'],
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__',
      svgoOptions: {
        plugins: [
          { name: 'removeAttrs', params: { attrs: '(width|height|fill|stroke)' } }, // Удаляем fill
          { name: 'removeViewBox', active: false }, // Сохраняем viewBox
        ],
      },
    }),
  ],
});