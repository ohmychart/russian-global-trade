import { countryTileScaleY, countryTileScaleX } from "$stores/scales.js";

import { scaleLinear } from "d3-scale";
import { max } from "d3-array";

export const setScales = function (
  data,
  displayFlows,
  displayYears,
  countryTileConfig
) {
  countryTileScaleY.set(
    scaleLinear()
      .range([countryTileConfig.height, 0])
      .domain([
        0,
        max(
          data.filter((d) => d.iso !== "WLD"),
          (d) =>
            max(
              d.records
                .filter((d) => displayFlows[d.flow.toLowerCase()])
                .map((d) => d.value)
            )
        ),
      ])
  );

  countryTileScaleX.set(
    scaleLinear().range([0, countryTileConfig.width]).domain(displayYears)
  );
};
