import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig((config) => {
	let { mode } = config;
	const env = loadEnv(mode, process.cwd());
	const { VITE_APP_BASE_URL } = env;
	console.log("VITE_APP_BASE_URL", VITE_APP_BASE_URL);
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
				// 跨域代理
				VITE_APP_BASE_PRE: {
					target: env.VUE_APP_BASE_API,
					// target: "http://localhost:8000",
					// target: VITE_APP_BASE_URL,
					changeOrigin: true,
					pathRewrite: {
						//重写路径,就是将上面的/api替换为''
						"^/apis": "",
						/*
									例子:假如我们请求的完整路径是https://www.xxx.com/public/shoplist
										那么按现在这种写法,在请求方法应该写成:get("/api/public/shoplist")
										在浏览器查看请求Request URL会显示:http://localhost:8080/api/public/shoplis
										因为重写了 '^/api': '' ，http://localhost:8080又指向了https://www.xxx.com，所以实际的请求是:https://www.xxx.com/public/shoplist
									*/
					},
				},
			},
		},
	};
});