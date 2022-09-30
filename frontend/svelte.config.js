import adapter from '@sveltejs/adapter-node';
import  sveltePreprocess  from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess (),
	kit: {
		adapter: adapter(),
		vite: {
			server: {
				port: 4000
			}
		},
		

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;
