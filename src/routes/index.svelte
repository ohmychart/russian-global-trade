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

<svelte:head>
	<title>С кем торгует Россия? Визуализация экспорта и импорта торваров между Россией и другими странами с 2000 по 2020 гг.</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="" />
	<meta name="author" content="Chartagrams.com" />

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
</svelte:head>
<Header />
<Visualization {data} />
