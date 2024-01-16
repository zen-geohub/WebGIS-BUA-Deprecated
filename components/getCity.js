import { map } from "../WebGIS.js";
import { userBua } from "./getBua.js";

export let currentCityLayer
export let userOptionn = document.querySelector('.citySelect')
export const existingChartContainer = document.querySelector('.chartContainer')
export let unavailableInformation = document.querySelector('.unavailable')
export let narrativeInfo = document.querySelector('.narrativeInfo')

// ------------------------Get User City Choice--------------------------------
const userOption = async () => {
  return new Promise((resolve) => {
    const userChoice = document.querySelector('.custom-select-city');

    userChoice.addEventListener('input', (e) => {
      let user = e.target.value;
      resolve(user);
    });
  });
}

// ------------------------Initialize Chart------------------------------------
let initializeChart = () => {
  const xValues = [];
  const chartConfig = {
    type: "line",
    data: {
      labels: ["2021", "2022", "2023"],
      datasets: [{
        data: xValues,
        backgroundColor: "rgba(19, 153, 108, 0.1)",
        borderColor: "rgba(19, 153, 108, 1)"
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      height: 295,
      legend: { display: false },
      title: {
        display: true,
        text: `Data `
      }
    },
  };
  const chartCanvas = document.getElementById("myChart");
  const myChart = new Chart(chartCanvas, chartConfig);

  chartCanvas.$chartjs.resizer.hidden = true;

  return myChart;
}
const myChart = initializeChart();

// ------------------------------------------------------------------



export const cityOption = async () => {
  const user = await userOption()
  // const userBua = await userBuaOption()

  // --------------------------Toggle Clear City------------------------
  if (user === 'clear') {
    if (currentCityLayer === undefined) {
      userOptionn.value = ""
    }
    else {
      map.removeLayer(currentCityLayer)

      existingChartContainer.style.visibility = ""
      unavailableInformation.style.visibility = ""

      userOptionn.value = ""

      // map.fitBounds(outer.getBounds())
    }
  }

  // --------------------------------------------------------------------


  // ----------------Find Boundaries based on User Choice----------------
  const getBoundariesName = async () => {
    const response = await fetch('http://localhost:3009/api/KP/getBoundariesName', {
      method: 'GET',
    })
    const boundaryData = await response.json()
    return boundaryData
  }
  const boundaries = await getBoundariesName()

  const getBoundary = boundaries.find((feature) => {
    let boundaryName = feature["name_2"].toLowerCase()
    return boundaryName == user.toLowerCase()
  })

  // ----------------------------------------------------------------------

  // ---------------------Toggle Clear City based BUA--------------------------------
  if (userBua[0] === 'clear') {                                            
    alert('Choose BUA!')

    userOptionn.value = ""
  }
  else if (userBua.length !== 0) {
    if (getBoundary) {
      if (currentCityLayer) {
        map.removeLayer(currentCityLayer)
      }

      let getBoundariesName = async () => {
        const response = await fetch(`http://localhost:3009/api/KP/getBoundaries/${getBoundary["gid"]}`, {
          method: "GET",
        });

        const data = await response.json()
        return data
      }
      const boundaryName = await getBoundariesName()

      // ----------------------Get Statistic Here--------------------------------------
      let userStatistics = []
      userStatistics.length = 0;
      userStatistics.push(
        boundaryName[0].citygeojson.properties["dummy_2021"],
        boundaryName[0].citygeojson.properties["dummy_2022"],
        boundaryName[0].citygeojson.properties["dummy_2023"]
      )

      myChart.config.data.datasets[0].data = userStatistics
      myChart.update()

      // --------------------------------------------------------------------------------

      // -------------------------Narrative Statistics----------------------------------
      narrativeInfo.innerHTML = `
      Pada tahun ${boundaryName[0].citygeojson.properties["gid"]} 
      terdapat Lorem ipsum dolor sit amet`

      // -------------------------------------------------------------------------------

      // --------------------------Toggle Display Check---------------------------------
      if (existingChartContainer.style.visibility === "") {
        existingChartContainer.style.visibility = "visible"

        unavailableInformation.style.visibility = "hidden"
        narrativeInfo.style.visibility = "visible"
      }

      // -------------------------------------------------------------------------

      currentCityLayer = L.geoJSON(boundaryName[0].citygeojson, {
      }).addTo(map)
      map.fitBounds(currentCityLayer.getBounds())
    }
  }
  else {
    alert('Choose BUA!')

    userOptionn.value = ""
  }
}

console.log(cityOption(), 'Dont mind me');