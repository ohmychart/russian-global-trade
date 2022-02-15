import adapter from "@sveltejs/adapter-static";
import path from "path";
import svg from "vite-plugin-svgstring";
import {getRoutes} from './src/utils/apiRoutesList.js';

const dev = process.env.NODE_ENV === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            pages: "docs",
            assets: "docs"
        }),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					"$components": path.resolve('./src/components'),
					"$utils": path.resolve("./src/utils"),
					"$stores": path.resolve("./src/stores"),
					"$data": path.resolve("./src/data"),
					"$styles": path.resolve("./src/styles"),
					"$svg": path.resolve("./src/svg")
				}
			},
			plugins: [
				svg()
			],
		},
		paths: {
			base: dev ? "" : "/russian-global-trade",
			// assets: dev ? "" : "/russian-global-trade"
		},
		prerender: {
			enabled: true,
			entries: getRoutes(),
		}
	}
};

export default config;
