import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const socialImage = fileURLToPath(
  new URL('./src/img/2aOboQnzQtmOrfUFCAXHhKZPEpnmrLBmLIS0MF3w.jpg', import.meta.url),
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'emit-social-image',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'og-image.jpg',
          source: readFileSync(socialImage),
        })
      },
    },
  ],
  base: '/',
})
