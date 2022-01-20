import { writable } from "svelte/store";

export let displayFlows = writable({
  import: true,
  export: true,
  turnover: true,
});

export let displayYearStart = writable(2000);
export let displayYearEnd = writable(2020);

export let endpointsOnly = writable(false);

export let clientWidth = writable();
export let isMobileView = writable(false);