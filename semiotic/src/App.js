import logo from "./logo.svg"
import "./App.css"
import XYChart, { colors } from "./charts/xychart"
import { useEffect, useState } from "react"
import { OrdinalFrame } from "semiotic"
import Xychart from "./charts/xychart"
import OrdinalChart from "./charts/OrdinalChart"
import NetworkChart from "./charts/NetworkChart"

const processCSV = (str, delim = ",") => {
  const headers = str.slice(0, str.indexOf("\n")).split(delim)
  const rows = str.slice(str.indexOf("\n") + 1).split("\n")
  const textHeaders = [
    "id",
    "type",
    "uri",
    "track_href",
    "analysis_url",
    "genre",
    "song_name",
    "title",
  ]

  const newArray = rows.map((row) => {
    const values = row.split(delim)
    const eachObject = headers.reduce((obj, header, i) => {
      if (textHeaders.includes(header)) {
        obj[header] = values[i]
      } else {
        obj[header] = parseFloat(values[i])
      }
      return obj
    }, {})
    return eachObject
  })

  return newArray
}

function App() {
  // const data = csv.toObjects();
  // console.log(data);
  const [chartName, setChartName] = useState("XYChart")
  const handleClickChartButton = (chartName) => {
    setChartName(chartName)
  }

  const currentChart = (chartName) => {
    if (chartName === "XYChart") {
      return <Xychart />
    } else if (chartName === "OrdinalChart") {
      return <OrdinalChart />
    } else if (chartName === "NetworkChart") {
      return <NetworkChart />
    } else {
      return <div>current chart not found</div>
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex" }}>
          <button onClick={() => handleClickChartButton("XYChart")}>
            {" "}
            XYChart
          </button>
          <button onClick={() => handleClickChartButton("OrdinalChart")}>
            {" "}
            OrdinalFrame
          </button>
          <button onClick={() => handleClickChartButton("NetworkChart")}>
            {" "}
            NetworkFrame
          </button>
        </div>
        {currentChart(chartName)}
      </header>
    </div>
  )
}

export default App
