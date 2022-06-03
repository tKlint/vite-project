import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dev from './config/DEV.config.js'
const baseConfig = {
    plugins: [react()]
}

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
