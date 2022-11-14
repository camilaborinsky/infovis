import { XYFrame } from "semiotic"
const steps = ["white", "#e0d33a"]
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
}

const XYChart = (coordinates) => {
  const frameProps = {
    points: [
      { liveness: 100, enery: 500, genre: "Techno" },
      { liveness: 80, enery: 550, genre: "Trap" },
    ],
    //summaries: [{ coordinates: coordinates }],
    size: [700, 400],
    margin: { left: 60, bottom: 90, right: 10, top: 40 },
    //summaryType: "heatmap",
    xAccessor: "liveness",
    yAccessor: "energy",
    yExtent: [0],
    xExtent: [0],
    // summaryStyle: (e) => ({
    //   //   fill: e.percent,
    //   stroke: "#ccc",
    //   strokeWidth: 0.5,
    // }),
    pointStyle: (d) => {
      return {
        r: 5,
        fill: d && colors[d.genre],
      }
    },
    title: <text textAnchor="middle">Songs Liveness vs Energy</text>,
    axes: [
      { orient: "left", label: "Enery" },
      { orient: "bottom", label: { name: "Liveness" } },
    ],
    showLinePoints: true,
    showSummaryPoints: true,
  }

  return <XYFrame {...frameProps} />
}
export default XYChart
