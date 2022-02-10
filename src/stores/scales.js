import { writable } from "svelte/store";


export const countryTileConfig = writable({
  width: 105,
  height: 75,
});

export const countryTileScaleY = writable();
export const countryTileScaleX = writable();

export const commodityAreaConfig = writable({
  width: 128,
  height: 38,
  margin: {
    right: 40,
    left: 0,
    top: 10,
    bottom: 10
  }
})

export const commodityAreaScaleY = writable();
export const commodityAreaScaleX = writable();
