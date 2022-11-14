import { scaleTime } from "d3-scale";

import { XYFrame } from "semiotic";
import { scaleLinear } from "d3-scale";
const steps = ["white", "#e0d33a"];
const thresholds = scaleLinear().range(steps);

const colors = {
  "Ex Machina": "#ac58e5",
  "Far from the Madding Crowd": "#E0488B",
  "The Longest Ride": "#9fd0cb",
};

export default (coordinates) => {
  const frameProps = {
    summaries: [{ coordinates: coordinates }],
    size: [700, 400],
    margin: { left: 60, bottom: 90, right: 10, top: 40 },
    summaryType: "heatmap",
    xAccessor: "liveness",
    yAccessor: "energy",
    yExtent: [0],
    xExtent: [0],
    summaryStyle: (e) => ({
      //   fill: e.percent,
      stroke: "#ccc",
      strokeWidth: 0.5,
    }),
    pointStyle: (d) => {
      return {
        r: 2,
        fill: d && colors[d.title],
      };
    },
    title: (
      <text textAnchor="middle">
        Theaters showing <tspan fill={"#ac58e5"}>Ex Machina</tspan> vs{" "}
        <tspan fill={"#E0488B"}>Far from the Madding Crowd</tspan>
      </text>
    ),
    axes: [
      { orient: "left", label: "Rank" },
      { orient: "bottom", label: { name: "Theaters", locationDistance: 55 } },
    ],
    showLinePoints: true,
    showSummaryPoints: true,
  };

  return <XYFrame {...frameProps} />;
};
