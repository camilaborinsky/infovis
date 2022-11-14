import { scaleTime } from "d3-scale";

import { XYFrame } from "semiotic";
import { scaleLinear } from "d3-scale";
const steps = ["white", "#e0d33a"];
const thresholds = scaleLinear().range(steps);

//Dictionary with keys Trap, Techno, Techhouse, Trance, Psytrance, Dark Trap, DnB (drums and bass), Hardstyle, Underground Rap, Trap Metal, Emo, Rap, RnB, Pop and Hiphop and values different colors
const colors = {
  Trap: "#e0d33a",
  Techno: "#038f67",
  Techhouse: "#598f03",
  Trance: "#8f4b03",
  Psytrance: "#e0743a",
  "Dark Trap": "#e03a42",
  "DnB (drums and bass)": "#e03a85",
  Hardstyle: "#c73ae0",
  "Underground Rap": "#693ae0",
  "Trap Metal": "##3a77e0",
  Emo: "#3adae0",
  Rap: "#f9d423",
  RnB: "#9fd0cb",
  Pop: "#E0488B",
  Hiphop: "#ac58e5",
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
        fill: d && colors[d.genre],
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
