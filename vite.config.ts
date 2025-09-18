import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  root: 'my-project',
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: 'my-project/index.html'
    }
  }
})
