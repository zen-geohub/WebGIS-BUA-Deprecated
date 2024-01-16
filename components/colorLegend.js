const legendValue = [
  { valueStart: 0, valueEnd: 20, color: "#ffa600" },
  { valueStart: 20, valueEnd: 40, color: "#ed8c00" },
  { valueStart: 40, valueEnd: 60, color: "#d97300" },
  { valueStart: 60, valueEnd: 80, color: "#c45b02" },
  { valueStart: 80, valueEnd: 100, color: "#ad4303" },
  // { valueStart: 32000, valueEnd: 40000, color: "#972b03" },
  // { valueStart: 40000, valueEnd: undefined, color: "#7f1100" },
]

let getColor = (buaPercentage) => {
  if (buaPercentage > legendValue[legendValue.length - 1]["valueStart"]) return legendValue[legendValue.length - 1]["color"]
  const itemLegend = legendValue.find(item => buaPercentage < item["valueEnd"] && buaPercentage > item["valueStart"])
  return itemLegend["color"]
}

export let chroloplethStyle2 = (layer) => {
  console.log(layer.properties["percent(%)"]);
  return {
    fillColor: getColor(layer.properties["percent(%)"]),
    weight: 2,
    opacity: 1,
    color: 'white',
    // dashArray: '3',
    fillOpacity: 0.7
  }
}