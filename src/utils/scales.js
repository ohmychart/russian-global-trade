import { countryTileScaleY, countryTileScaleX, commodityAreaScaleX, commodityAreaScaleY } from "$stores/scales.js";

import { scaleLinear } from "d3-scale";
import { max } from "d3-array";

const filterRange = (rec, displayYearStart, displayYearEnd) => {
  return rec.year >= displayYearStart && rec.year <= displayYearEnd;
};

const filterEndpoints = (rec, displayYearStart, displayYearEnd) => {
  return rec.year == displayYearStart || rec.year == displayYearEnd;
};

export const filterData = function (
  data,
  displayFlows,
  displayYearStart,
  displayYearEnd,
  endpointsOnly
) {
  let filterYears = filterRange;
  if (endpointsOnly) filterYears = filterEndpoints;

  const filtered = data
    .filter((d) => d.iso !== "WLD")
    .map((d) => {
      return {
        records: d.records.filter(
          (rec) =>
            filterYears(rec, displayYearStart, displayYearEnd) &&
            displayFlows[rec.flow.toLowerCase()]
        ),
        country: d.country,
        iso: d.iso,
        continent: d.continent,
      };
    });

  return filtered;
};

export const setScales = function (
  data,
  displayYearStart,
  displayYearEnd,
  countryTileConfig,
  commodityAreaConfig
) {
  countryTileScaleY.set(
    scaleLinear()
      .range([countryTileConfig.height, 0])
      .domain([0, max(data, (d) => max(d.records.map((d) => d.value)))])
  );

  countryTileScaleX.set(
    scaleLinear()
      .range([0, countryTileConfig.width])
      .domain([displayYearStart, displayYearEnd])
  );

  commodityAreaScaleY.set(
    scaleLinear()
      .range([commodityAreaConfig.height, 0])
      .domain([0, 100])
  );

  commodityAreaScaleX.set(
    scaleLinear()
      .range([0, commodityAreaConfig.width])
      .domain([displayYearStart, displayYearEnd])
  );
};
