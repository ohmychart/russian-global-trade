import { writable } from "svelte/store";
import { scaleLinear } from "d3-scale";

export const countryTileConfig = writable({
  width: 100,
  height: 75,
});

export const countryTileScaleY = writable(scaleLinear());

export const countryTileScaleX = writable(scaleLinear());
