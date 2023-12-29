import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
 //Gund-Zero/
  base: '/gundzero/', //formerly just "/"
  plugins: [react()],
  
})
