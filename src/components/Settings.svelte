<script>
	import {
		displayFlows,
		displayYearStart,
		displayYearEnd,
		endpointsOnly
	} from '$stores/settings.js';

	import InputNumberRange from '$components/InputNumberRange.svelte';
	import Checkbox from '$components/Checkbox.svelte';

	$: if (!$displayFlows.turnover && !$displayFlows.export && !$displayFlows.import) {
		$displayFlows.turnover = true;
		$displayFlows.export = true;
		$displayFlows.import = true;
	}
</script>

<div id="container">

	
	<div id="years-settings-container">
		<div>
		<InputNumberRange
			minValue="2000"
			maxValue="2020"
			bind:startValue={$displayYearStart}
			bind:endValue={$displayYearEnd}
		/>
		</div>
		
		<div>
		<Checkbox bind:checked={$endpointsOnly} label="Период" />
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
		padding-top: 1.5rem;
		text-align: center;
	}

	#years-settings-container div {
		display: inline-block;
		margin-left: 0.5rem;
		margin-top: 1rem;
	}

	#flows-settings-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;

	}

	#flows-settings-container div {
		margin: 0 0.5rem;
	}


	#container {
		
		margin: auto;
		padding-bottom: 1.5rem;
		padding-top: 1.5rem;
	}
</style>
