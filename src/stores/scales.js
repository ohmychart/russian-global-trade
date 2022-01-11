import { writable } from "svelte/store";


export const countryTileConfig = writable({
  width: 100,
  height: 75,
});

export const countryTileScaleY = writable();

export const countryTileScaleX = writable();
