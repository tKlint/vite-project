/**
 * @type {import('vite').UserConfig}
 */
const devConfig = {
    root: process.cwd(),
    base: './',
    mode: 'development',
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true,
            },
        }
    }
}

module.exports = devConfig;