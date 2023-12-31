import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'
// https://vitejs.dev/config/

dns.setDefaultResultOrder('verbatim')
export default defineConfig({
 //Gund-Zero/
  base: '/gundzero/', //formerly just "/"
  plugins: [react()],

  
})
