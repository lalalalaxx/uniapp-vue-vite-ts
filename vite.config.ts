import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    console.log('xxxx', env.VITE_APP_BASE_PRE)

    const { VITE_APP_BASE_URL, VITE_APP_BASE_PRE } = env
    console.log('VITE_APP_BASE_URL', VITE_APP_BASE_URL, VITE_APP_BASE_PRE)
    return {
        transpileDependencies: ['uview-plus'],
        plugins: [
            uni(),
            AutoImport({
                imports: ['vue', 'uni-app'],
                // 生成自动导入的TS声明文件
                vueTemplate: true,
                dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts')
            })
            // Components({
            //     dts: path.resolve(pathSrc, 'types', 'auto-components.d.ts')
            // })
            // Components({
            //     dts: './src/types/auto-components.d.ts',
            //     dirs: [path.resolve(__dirname, './src/components')],
            // }),
        ],
        resolve: {
            // 别名
            alias: {
                '@': path.join(__dirname, './src')
            }
        },
        // css: {
        //     preprocessorOptions: {
        //         scss: {
        //             additionalData: '@import "./src/uni.scss";'
        //         }
        //     }
        // },
        server: {
            // port: 3000,
            proxy: {
                [VITE_APP_BASE_PRE]: {
                    target: VITE_APP_BASE_URL,
                    ws: true,
                    changeOrigin: true,
                    // 要记得加rewrite这句
                    // rewrite: (path) => path.replace(/^\/apis/, ''),
                    rewrite: (path) => path.replace(new RegExp('^' + VITE_APP_BASE_PRE), '')
                }
            }
        }
    }
})
