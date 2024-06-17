import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginRequire from "vite-plugin-require"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        vitePluginRequire.default(),
    ],
    server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
            '/api': 'http://192.168.1.200:5000/'
        }
    }
})
