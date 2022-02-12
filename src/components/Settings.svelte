<script>
	import {
		displayFlows,
		displayYearStart,
		displayYearEnd,
		endpointsOnly
	} from '$stores/settings.js';

	import InputNumberRange from '$components/InputNumberRange.svelte';
	import Checkbox from '$components/Checkbox.svelte';
	import GhostButton from '$components/GhostButton.svelte';
	import Icon from '$components/Icon.svelte';

	$: if (!$displayFlows.turnover && !$displayFlows.export && !$displayFlows.import) {
		$displayFlows.turnover = true;
		$displayFlows.export = true;
		$displayFlows.import = true;
	}
</script>

<div id="container">
	<div id="years-settings-container">
		<div class="years-range-wrapper">
			<InputNumberRange
				minValue="2000"
				maxValue="2020"
				bind:startValue={$displayYearStart}
				bind:endValue={$displayYearEnd}
			/>
		</div>

		<div class="endpoints-range-wrapper">
			<Checkbox bind:checked={$endpointsOnly} label="Только период" />
		</div>
	</div>

	<div id="flows-settings-container">
		<div><Checkbox bind:checked={$displayFlows.turnover} label="Оборот" /></div>
		<div><Checkbox bind:checked={$displayFlows.import} label="Импорт" /></div>
		<div><Checkbox bind:checked={$displayFlows.export} label="Экспорт" /></div>
	</div>
</div>

<style>
	#years-settings-container {
		padding: 8px 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 8px 0 8px;
		outline: 2px solid var(--color-dark-light);
	}

	.endpoints-range-wrapper {
		margin-top: 8px;
	}

	#flows-settings-container {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 8px 10px;
		margin: 10px 8px 0 8px;
		
	}

	#flows-settings-container div {
		display: inline-block;
		margin-left: 16px;
	}

	#flows-settings-container div:nth-child(1) {
		display: inline-block;
		margin-left: 0;
	}

	#container {
		margin: auto;
	}

	:global(.range-icon) {
		color: var(--color-dark-medium);
	}

	:global(.range-icon-selected) {
		color: var(--color-white-primary);
	}
</style>
