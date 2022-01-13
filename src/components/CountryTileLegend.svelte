<script>
	import CountryTile from '$components/CountryTile.svelte';
    import { displayFlows } from '$stores/settings.js';
    import { countryTileScaleY } from '$stores/scales.js'

	export let country;

    $: ticks = [
        $countryTileScaleY.domain()[0],
        $countryTileScaleY.domain()[1] / 2,
        $countryTileScaleY.domain()[1],
    ];

    const tickLabel = (tick) => {
        return `$${(tick / 1e9).toFixed(0)} млрд`
    }

</script>

<CountryTile {country}>
    <g slot="yAxis" transform="translate(-5, 0)">
        <g>
            <line x2="-5"/>
            <text class="tick-label">{tickLabel(ticks[2])}</text>
        </g>

        <g transform="translate(0, {$countryTileScaleY(ticks[1])})">
            <line x2="-5"/>
            <text class="tick-label">{tickLabel(ticks[1])}</text>
        </g>

        <g transform="translate(0, {$countryTileScaleY(ticks[0])})">
            <line x2="-5"/>
            <text class="tick-label">{tickLabel(ticks[0])}</text>
        </g>
        
    </g>

	<g slot="legend" transform="translate(120, 4)">
        {#if $displayFlows.turnover }
		<g transform="translate(0, 0)">
			<rect width="20" height="20" class="turnover" />
			<text transform="translate(25, 13)">Оборот</text>
		</g>
        {/if}
        {#if $displayFlows.import }
		<g transform="translate(0, 24)">
			<rect width="20" height="20" class="import" />
			<text transform="translate(25, 13)">Импорт</text>
		</g>
        {/if}
        {#if $displayFlows.export }
		<g transform="translate(0, 48)">
			<rect width="20" height="20" class="export" />
			<text transform="translate(25, 13)">Экспорт</text>
		</g>
        {/if}
	</g>
</CountryTile>

<style>
	text {
		font-size: 13px;
        fill: var(--color-dark-primary);
	}

    .tick-label {
        text-anchor: end;
        transform: translate(-10px, 5px);
        font-size: 13px;
    }

    line {
        stroke-width: 1px;
        stroke: var(--color-dark-secondary);
    }

	.turnover {
		stroke: #212121ff;
		stroke-width: 1px;
		fill: none;
		stroke-dasharray: 2 2;
	}

	.import {
		fill: #212121ff;
	}

	.export {
		fill: #00bfa580;
	}
</style>
