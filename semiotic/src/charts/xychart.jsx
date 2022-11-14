import { XYFrame } from "semiotic";
import { useEffect, useState } from "react";
import { processCSV } from "../App";
const steps = ["white", "#e0d33a"];
//const thresholds = scaleLinear().range(steps)

//Dictionary with keys Trap, Techno, Techhouse, Trance, Psytrance, Dark Trap, DnB (drums and bass), Hardstyle, Underground Rap, Trap Metal, Emo, Rap, RnB, Pop and Hiphop and values different colors
export const colors = {
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
export const colorArray = [
  "#e0d33a",
  "#038f67",
  "#598f03",
  "#8f4b03",
  "#e0743a",
  "#e03a42",
  "#e03a85",
  "#c73ae0",
  "#693ae0",
  "##3a77e0",
  "#3adae0",
  "#f9d423",
  "#9fd0cb",
  "#E0488B",
  "#ac58e5",
];

const XYChart = (coordinates) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const load = async () => {
      const response = await fetch("resources/genres_v2.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = await decoder.decode(result.value);
      const jsons = processCSV(csv);
      console.log("LENGT==", jsons.length);
      // const sample = [];
      // for (let i = 0; i < 200; i++) {
      //   const idx = Math.random() * jsons.length;
      //   sample.push(jsons[idx]);
      // }
      // console.log(sample);
      setData(jsons);
    };
    load();
  }, []);
  const frameProps = {
    points: data,
    //summaries: [{ coordinates: coordinates }],
    size: [1200, 500],
    margin: { left: 60, bottom: 90, right: 10, top: 40 },
    //summaryType: "heatmap",
    xAccessor: "danceability",
    yAccessor: "energy",
    yExtent: [0],
    xExtent: [0],
    // summaryStyle: (e) => ({
    //   //   fill: e.percent,
    //   stroke: "#ccc",
    //   strokeWidth: 0.5,
    // }),
    pointStyle: (d) => {
      const idx = Math.random() * Object.keys(colors).length;
      return {
        r: d.liveness * 10,
        fill: colorArray[Math.floor(idx)],
      };
    },
    title: <text textAnchor="middle">Songs Liveness vs Energy</text>,
    axes: [
      { orient: "left", label: "Energy" },
      { orient: "bottom", label: { name: "Danceability" } },
    ],
    showLinePoints: true,
    showSummaryPoints: true,
  };

  return <XYFrame {...frameProps} />;
};
export default XYChart;
