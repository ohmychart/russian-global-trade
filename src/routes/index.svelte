<script context="module">
	export async function load({ fetch }) {
		const response = await fetch('/api/data');
		const data = await response.json();

		return {
			props: {
				data
			}
		};
	}
</script>

<script>
	import '$styles/app.css';

	export let data;

	import Header from '$components/Header.svelte';
	import Visualization from '$components/Visualization.svelte';
</script>

<Header />
<Visualization {data} />
