<script>
import CommodityArea from '$components/CommodityArea.svelte';
import {map as commodityDesc} from '$data/commodityCodeMap.js';
import {formatTicksY} from '$utils/helpers.js';
import { isMobileView } from '$stores/settings.js';

export let data;
export let flow;

</script>

<table>
    {#each data as records }
        {#if $isMobileView}
        <tr>
            <td class="description mobile" colspan="2">{commodityDesc[records[0]]}:</td>
        </tr>
        <tr>
            <td class="total">
                <div>{formatTicksY(records[1].total).slice(0, -5)}</div>
                <div>млрд</div>
            </td>
            
            <td class="chart"><CommodityArea records={records[1].records} {flow} /></td>
        </tr>
        {:else}
        <tr>
            <td class="total">
                <div>{formatTicksY(records[1].total).slice(0, -5)}</div>
                <div>млрд</div>
            </td>
            <td class="description">{commodityDesc[records[0]]}</td>
            <td class="chart"><CommodityArea records={records[1].records} {flow} /></td>
        </tr>
        {/if}
    {/each}
</table>

<style>
table {
    margin: 0;
    padding: 0;
}

td {
    border-bottom: 2px solid var(--color-dark-light);
}

.description.mobile {
    
    border-bottom: none;
}

.description, .total {
    font-size: 13px;
}

.description {
    text-align: left;
    
}

.total {
    text-align: center;
    width: 50px;
}

.chart {
    text-align: center;
}


</style>