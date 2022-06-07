import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dev from './config/DEV.config.js'
const baseConfig = {
    plugins: [react()]
}



// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://url:port',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    if (command === 'serve') {
        return {
            ...baseConfig,
            ...dev
        }
    } else {
        return {
            plugins: [react()],

        }
    }
})
