import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
// import { devConfig } from './config/DEV.config';
// allowSyntheticDefaultImports
import path from 'path';
import vitePluginImp from 'vite-plugin-imp';

export default defineConfig(({ command }) => {
    return {
        root: process.cwd(),
        base: './',
        mode: 'development',
        server: {
            port: 3000,
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:3001',
                    changeOrigin: true
                }
            }
        },
        plugins: [
            react(),
            viteEslint({ fix: true, cache: false }),
            vitePluginImp({
                libList: [
                    {
                        libName: 'antd',
                        style: (name) => `antd/es/${name}/style`
                    }
                ]
            })
        ],
        resolve: {
            alias: [
                {
                    find: /^~/,
                    replacement: ''
                },
                {
                    find: '@',
                    replacement: path.resolve(__dirname, './src')
                }
            ]
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    modifyVars: {
                        '@primary-color': '#4377FE'
                    }
                }
            }
        }
    };
});
