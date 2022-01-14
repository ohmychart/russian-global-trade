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
		<InputNumberRange
			minValue="2000"
			maxValue="2020"
			bind:startValue={$displayYearStart}
			bind:endValue={$displayYearEnd}
		/>
	
		<Checkbox bind:checked={$endpointsOnly} label="Только период" />
	</div>

	<div id="flows-settings-container">
		<Checkbox bind:checked={$displayFlows.turnover} label="Оборот" />
		<Checkbox bind:checked={$displayFlows.import} label="Импорт" />
		<Checkbox bind:checked={$displayFlows.export} label="Экспорт" />
	</div>
</div>


<style>
	#years-settings-container, #flows-settings-container {
		margin: 2rem auto 2rem auto;
	}

	#container {
		text-align: center;
	}
</style>
