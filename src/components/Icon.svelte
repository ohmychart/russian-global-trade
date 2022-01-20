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
		},
		range: {
			svg: { viewBox: '0 0 32 8', fill: 'none', stroke: 'none' },
			paths: [
				{
					fill: 'currentColor',
					d: "M7.87398 5C7.42994 6.72523 5.86384 8 4 8C1.79086 8 0 6.20914 0 4C0 1.79086 1.79086 0 4 0C5.86384 0 7.42994 1.27477 7.87398 3H24.126C24.5701 1.27477 26.1362 0 28 0C30.2091 0 32 1.79086 32 4C32 6.20914 30.2091 8 28 8C26.1362 8 24.5701 6.72523 24.126 5H7.87398Z"
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
