import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
    legacy({
      // Chrome 56 / Android 7.1.2 — no ES module support; plugin emits an ES5
      // <script nomodule> bundle with core-js + regenerator-runtime polyfills.
      targets: ['chrome >= 56', 'and_chr >= 56'],
      modernPolyfills: true,
      renderLegacyChunks: true,
    }),
  ],
  build: {
    // Modern bundle target. plugin-legacy separately emits the ES5 legacy bundle.
    target: 'es2017',
  },
});