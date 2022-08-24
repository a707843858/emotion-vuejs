import {defineConfig} from 'vite'
import vue            from '@vitejs/plugin-vue'
import {resolve}      from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '0.0.0.0',
        port: 80,
        https: false
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/core/index.ts'),
            name: 'index',
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})
