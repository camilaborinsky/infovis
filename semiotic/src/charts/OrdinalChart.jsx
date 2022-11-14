import { OrdinalFrame } from "semiotic"
import { useEffect, useState } from "react"
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
const OrdinalChart = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const load = async () => {
      const response = await fetch("resources/genres_v2.csv")
      const reader = response.body.getReader()
      const result = await reader.read()
      const decoder = new TextDecoder("utf-8")
      const csv = await decoder.decode(result.value)
      const jsons = processCSV(csv)
      setData(jsons)
      console.log("JSONS===", jsons)
      const genresSummary = jsons.reduce(
        (prev, currentValue, currentIndex, array) => {
          //console.log("ARRAY", array)
          let list
          if (currentValue.genre) {
            const genreSummary = array.find(
              (value, index) => currentValue.genre === value.genre
            )
            console.log(genreSummary)
            if (genreSummary) {
              console.log("chau")
              const updatedGenreSummary = {
                genre: currentValue.genre,
                acousticness:
                  currentValue.acousticness + genreSummary.acousticness,
                danceability:
                  currentValue.danceability + genreSummary.danceability,
                energy: currentValue.enery + genreSummary.enery,
                instrumentalness:
                  currentValue.instrumentalness + genreSummary.instrumentalness,
                liveness: currentValue.liveness + genreSummary.liveness,
                loudness: currentValue.loudness + genreSummary.loudness,
                speechiness:
                  currentValue.speechiness + genreSummary.speechiness,
                tempo: currentValue.tempo + genreSummary.tempo,
                valence: currentValue.valence + genreSummary.valence,
                amount: genreSummary.amount + 1,
              }
              list = array
              const genreIndex = array.findIndex(
                (value, index) => currentValue.genre === value.genre
              )
              list[genreIndex] = updatedGenreSummary
            } else {
              console.log("hola")
              list = [...array]

              list.append({
                genre: currentValue.genre,
                acousticness: currentValue.acousticness,
                danceability: currentValue.danceability,
                energy: currentValue.enery,
                instrumentalness: currentValue.instrumentalness,
                liveness: currentValue.liveness,
                loudness: currentValue.loudness,
                speechiness: currentValue.speechiness,
                tempo: currentValue.tempo,
                valence: currentValue.valence,
                amount: 0,
              })
            }
            return list
          } else {
            return array
          }
        },
        []
      )
      console.log("GENRES SUMMARY===", genresSummary)
    }
    load()
  }, [])

  const frameProps = {
    data: [
      {
        name: "Pikachu",
        color: "#e0d33a",
        attribute: "attack",
        value: 55,
        defense: 40,
        speed: 90,
        hp: 35,
      },
      { name: "Pikachu", color: "#e0d33a", attribute: "defense", value: 40 },
      {
        name: "Pikachu",
        color: "#e0d33a",
        attribute: "energy",
        value: 55,
        defense: 40,
        speed: 90,
        hp: 35,
      },
      {
        name: "Raichu",
        color: colors.Hardstyle,
        attribute: "attack",
        value: 80,
        defense: 40,
        speed: 90,
        hp: 35,
      },
      { name: "Raichu", color: "#e0d33a", attribute: "defense", value: 40 },
      {
        name: "Raichu",
        color: "#e0d33a",
        attribute: "energy",
        value: 30,
        defense: 40,
        speed: 90,
        hp: 35,
      },
    ],
    size: [500, 500],
    margin: { left: 40, top: 50, bottom: 75, right: 120 },
    axes: true,
    /* --- Layout --- */
    type: "point",
    connectorType: (e) => e.name,
    projection: "radial",

    /* --- Process --- */
    oAccessor: "attribute",
    rAccessor: "value",
    rExtent: [0],

    /* --- Customize --- */
    style: (e) => ({ fill: e.color, stroke: "white", strokeOpacity: 0.5 }),
    connectorStyle: (e) => ({
      fill: e.source.color,
      stroke: e.source.color,
      strokeOpacity: 0.5,
      fillOpacity: 0.5,
    }),
    title: "Pokemon Base Stats",
    foregroundGraphics: [
      <g transform="translate(420, 73)" key="legend">
        <text key={1} fill={"#ac58e5"}>
          New York
        </text>
        <text key={1} y={20} fill={"#E0488B"}>
          Las Vegas
        </text>
        <text key={1} y={40} fill={"#9fd0cb"}>
          San Diego
        </text>
        <text key={1} y={60} fill={"#e0d33a"}>
          Denver
        </text>
        <text key={1} y={80} fill={"#7566ff"}>
          Oakland
        </text>
      </g>,
    ],
    /* --- Interact --- */
    pieceHoverAnnotation: true,

    /* --- Annotate --- */
    oLabel: true,
  }
  //read data from csv
  if (data) console.log(data[0])

  // data.length > 0 ? (
  return (
    <>
      holaaa
      <OrdinalFrame {...frameProps} />
    </>
  )
  // ) : (
  //   <h2>Loaing...</h2>
  // )
}

export default OrdinalChart
