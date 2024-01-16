import { toggle } from './components/sidebar.js'
import { cityOption } from './components/getCity.js'
import { buaOption } from './components/getBua.js'
import { outerJakarta } from './dummy/outerJakarta.js'

export let map = L.map('map')
const viewJakarta = [-6.168748062432924, 106.82589636362823]
const viewYogya = [-7.772139937172946, 110.310712088774338]
map.setView(viewJakarta, 13)
map.createPane('labels')

map.on('zoomend', function (e) {
  console.log(e.target._zoom);
});

// map.getZoom().addEventListener('change', () => {
//   console.log('hello');
// })

let cartoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
  // attribution: '©OpenStreetMap, ©CartoDB',
  pane: 'labels'
}).addTo(map)

let cartoBasemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  // attribution: '&copy;OpenStreetMap, &copy;CartoDB'
}).addTo(map)

// export let outer = L.geoJSON(outerJakarta, {
//   style: (feature) => {
//     return {
//       opacity: 0,
//       fillOpacity: 0
//     }
//   }
// }).addTo(map)

// map.fitBounds(outer.getBounds())

document.querySelector('.custom-select-bua').addEventListener('change', buaOption)
document.querySelector('.custom-select-city').addEventListener('change', cityOption)
document.querySelector('.layerContainer-toggle').addEventListener('click', toggle)

// let getBogor = async () => {
//   const response = await fetch('http://localhost:3000/api/KP/getCoba', {
//     method: 'GET',
//   })
//   const boundaryData = await response.json()
//   return boundaryData

//   // let layer = L.geoJSON(boundaryData.citygeojson).addTo(map)

//   // map.fitBounds(layer.getBounds())
// }
// const data = await getBogor()

let group = L.featureGroup()

// data.forEach(feature => {
//   // console.log(feature.citygeojson.properties);
//   let addData = L.geoJSON(feature.citygeojson, {
//     style: {
//       weight: 0,
//       fillOpacity: 0.7,
//     },
//     onEachFeature: (feature, layer) => {
//       layer.on('click', () => {
//         group.eachLayer((l) => {
//           l.setStyle({
//             weight: 0,
//             fillOpacity: 0.7,
//           });
//         });

//         // Highlight the clicked layer
//         layer.setStyle({
//           weight: 2,  // Set your desired weight
//           fillOpacity: 1,  // Set your desired fillOpacity
//         });
//         console.log('hello');
//       })
//       layer.bindPopup(`${feature.properties.gid}`)
//     }
//   })
//   group.addLayer(addData)
// })
map.on('click', () => {
  group.eachLayer((layer) => {
    layer.setStyle({
      weight: 0,
      fillOpacity: 0.7,
    });
  });
});

const mapit = () => {
  group.addTo(map)
}

// document.querySelector('.coba').addEventListener('click', mapit)

// const buaData = L.geoJSON(bua22, {
//   style: (feature) => {
//     const percentValue = feature.properties["percent(%)"];
//     const colorScale = ["#ffffff", "#ffbfbf", "#ff8080", "#ff4040", "#ff0000", "#ff0000"];
//     const index = Math.floor((percentValue) / 20); // Adjusted to start from 0

//     return {
//       fillColor: colorScale[index], // Default color
//       // weight: 2,
//       opacity: 0,
//       color: 'none',
//       fillOpacity: 0.7
//     };
//   },
//   onEachFeature: (feature, layer) => {
//     layer.bindPopup(`${feature.properties["percent(%)"]}`);
//   }
// }).addTo(map);