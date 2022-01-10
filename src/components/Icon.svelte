<script>
	export let size = '1rem';
	export let name;
	export let id = "";
	let className = "";
	export {className as class};

	const icons = {
		menu: {
			svg: { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
			paths: [
				{
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round',
					'stroke-width': '2',
					d: 'M4 6h16M4 12h16M4 18h16'
				}
			]
		},
		x: {
			svg: { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' },
			paths: [
				{
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round',
					'stroke-width': '2',
					d: 'M6 18L18 6M6 6l12 12'
				}
			]
		},
		pixelArrow: {
			svg: { viewBox: '0 0 30 42', fill: 'none', stroke: 'none' },
			paths: [
				{
					fill: 'currentColor',
					d: 'M0 42V36H6V30H12V24H18V18H12V12H6V6H0V0H12V6H18V12H24V18H30V24H24V30H18V36H12V42H0Z'
				}
			]
		}
	};
</script>

<svg {...icons[name]['svg']} width={size} height={size} {id} class={className}>
	{#each icons[name]['paths'] as pathProps}
		<path {...pathProps} />
	{/each}
</svg>

<style>
	svg {
		position: relative;
		display: inline-block;
	}
</style>
