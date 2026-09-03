import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/map_game/',
  plugins: [react()],
  server: {
    host: true,
  },
})
