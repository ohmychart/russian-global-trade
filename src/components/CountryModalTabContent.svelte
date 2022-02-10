<script>
import CommodityArea from '$components/CommodityArea.svelte';
import {map as commodityDesc} from '$data/commodityCodeMap.js';
import {formatTicksY} from '$utils/helpers.js';

export let data;
export let flow;

</script>

<ul>
{#each data as records }
<li>
    <div class="total">
        <div>{formatTicksY(records[1].total).slice(0, -5)}</div>
        <div>млрд</div>
    </div>
    <div class="description">{commodityDesc[records[0]]}</div>
    <div class="chart"><CommodityArea records={records[1].records} {flow} /></div>
    
</li>
{/each}
</ul>

<style>
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

li {
    display: grid;
    grid-template-columns: 64px auto 168px;
    column-gap: 16px;
    margin-bottom: 0;
    align-items: center;
    border-bottom: 2px solid var(--color-dark-light);
}

.description, .total {
    font-size: 13px;
}

.description {
    text-align: left;
}

.total {
    margin: auto;
    text-align: center;
}
</style>