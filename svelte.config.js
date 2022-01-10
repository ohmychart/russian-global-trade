import adapter from '@sveltejs/adapter-auto';
import path from "path";
import svg from "vite-plugin-svgstring";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

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
		}
	}
};

export default config;