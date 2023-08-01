import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from "path";
// https://vitejs.dev/config/
export default defineConfig((config) => {
    let { mode } = config;
    const env = loadEnv(mode, process.cwd());
    console.log('xxxx', env.VITE_APP_BASE_PRE);

    const { VITE_APP_BASE_URL, VITE_APP_BASE_PRE } = env;
    console.log("VITE_APP_BASE_URL", VITE_APP_BASE_URL, VITE_APP_BASE_PRE);
    return {
        transpileDependencies: ["uview-plus"],
        plugins: [
            uni(),
            // ,Components({
            // 	resolvers: [VantResolver()],
            // })
        ],
        resolve: {
            // 别名
            alias: {
                "@": path.join(__dirname, "./src"),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "./src/uni.scss";',
                },
            },
        },
        server: {
            // 不起作用
            // port: 3000,
            proxy: {
                [VITE_APP_BASE_PRE]: {
                    target: VITE_APP_BASE_URL,
                    ws: true,
                    changeOrigin: true,
                    // 要记得加rewrite这句
                    // rewrite: (path) => path.replace(/^\/apis/, ''),
                    rewrite: (path) =>
                        path.replace(new RegExp("^" + VITE_APP_BASE_PRE), "")
                },
            },
        },
    };
});
