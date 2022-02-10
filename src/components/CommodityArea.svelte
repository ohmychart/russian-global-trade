<script>
	import { commodityAreaConfig, commodityAreaScaleX, commodityAreaScaleY } from '$stores/scales.js';
	import { area } from 'd3-shape';

	export let records;
	export let flow;

	const yTicks = [0, 50, 100];
	const yGrid = [];

	const width =
		$commodityAreaConfig.width +
		$commodityAreaConfig.margin.right +
		$commodityAreaConfig.margin.left;
	const height =
		$commodityAreaConfig.height +
		$commodityAreaConfig.margin.top +
		$commodityAreaConfig.margin.bottom;

	$: areaGenerator = area()
		.x((d) => $commodityAreaScaleX(d.year))
		.y0($commodityAreaScaleY(0))
		.y1((d) => $commodityAreaScaleY(d.pct));

	$: commodityArea = areaGenerator(records);
</script>

<svg width="{width}px" height="{height}px">
	<g transform="translate({$commodityAreaConfig.margin.left}, {$commodityAreaConfig.margin.top})">
		<g class="y-grid">
			{#each yGrid as line}
				<line
					x2={$commodityAreaConfig.width}
					y1={$commodityAreaScaleY(line)}
					y2={$commodityAreaScaleY(line)}
				/>
			{/each}
		</g>

		<path d={commodityArea} class="commodity-area-{flow}" />

		<g class="y-axis" transform="translate({$commodityAreaConfig.width + 5}, 0)">
			{#each yTicks as tick}
            <g transform="translate(0, {$commodityAreaScaleY(tick)})">
                <line x2="2.5" />
				<text>{tick}%</text>
            </g>
			{/each}

			<line y2={$commodityAreaConfig.height} />
		</g>
	</g>
</svg>

<style>
	svg {
		margin: auto;
	}

	.y-axis text {
		font-size: 10px;
		fill: var(--color-dark-primary);
		transform: translate(5px, 2.5px);
	}

	.y-axis line {
		stroke: var(--color-dark-primary);
		stroke-width: 0.5px;
		shape-rendering: crispEdges;
	}

	.commodity-area-import {
		fill: var(--color-import);
	}

	.commodity-area-export {
		fill: var(--color-export);
	}
</style>
