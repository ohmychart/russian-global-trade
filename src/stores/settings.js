import { writable } from "svelte/store";

export let displayFlows = writable({
  import: true,
  export: true,
  turnover: true,
});

export let displayYears = writable([2000, 2020]);
