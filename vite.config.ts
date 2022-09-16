import path           from 'path'
import {defineConfig} from 'vite'
import vue            from '@vitejs/plugin-vue'
import {resolve}      from 'path'
import vueJsx         from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.json', '.ts']
    },
    server: {
        host: '0.0.0.0',
        port: 80,
        https: false
    },
    build: {
        sourcemap: true,
        minify: false,
        lib: {
            entry: resolve(__dirname, 'src/core/index.ts'),
            name: 'index',
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['vue'], // '@emotion/cache', '@emotion/serialize', '@emotion/utils'
            output: {
                globals: {
                    vue: 'Vue',
//                    '@emotion/cache': '@emotion/cache',
//                    '@emotion/serialize': '@emotion/serialize',
//                    '@emotion/utils': '@emotion/utils'
                }
            }
        }
    },
    define: { 'process.env': {} }
})
