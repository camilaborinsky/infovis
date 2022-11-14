import logo from "./logo.svg";
import "./App.css";
import XYChart from "./charts/xychart";
import { useEffect, useState } from "react";

const processCSV = (str, delim = ",") => {
  const headers = str.slice(0, str.indexOf("\n")).split(delim);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  const newArray = rows.map((row) => {
    const values = row.split(delim);
    const eachObject = headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {});
    return eachObject;
  });

  return newArray;
};

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const load = async () => {
      const response = await fetch("resources/genres_v2.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = await decoder.decode(result.value);
      const jsons = processCSV(csv);
      setData(jsons);
    };
    load();
  }, []);

  //read data from csv
  if (data) console.log(data[0]);
  // const data = csv.toObjects();
  // console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        {data.length > 0 ? <XYChart {...data} /> : <h2>Loading...</h2>}
      </header>
    </div>
  );
}

export default App;
