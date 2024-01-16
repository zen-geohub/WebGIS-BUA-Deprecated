import { map } from "../WebGIS.js";
import { currentCityLayer, existingChartContainer, userOptionn, unavailableInformation, narrativeInfo } from "./getCity.js";

let currentLayer
export let userBua = []
let userBuaOptionn = document.querySelector('.buaSelect')
let legend = document.querySelector('.legendWrapper')

export const userBuaOption = async () => {
  return new Promise((resolve) => {
    const userChoice = document.querySelector('.custom-select-bua');

    userChoice.addEventListener('input', (e) => {
      let user = e.target.value;
      resolve(user);
    });
  });
}



export const buaOption = async () => {
  const user = await userBuaOption()
  userBua.length = 0;
  userBua.push(user)

  if (user) {
    unavailableInformation.style.visibility = "hidden"
    if (user === 'clear') {
      if (currentCityLayer === undefined) { }
      else {
        map.removeLayer(currentCityLayer)
      }
      if (currentLayer === undefined) {
        userBuaOptionn.value = ""
      }
      else {
        map.removeLayer(currentLayer)
        existingChartContainer.style.visibility = ""

        userOptionn.value = ""
        userBuaOptionn.value = ""
        unavailableInformation.style.visibility = ""

        narrativeInfo.innerHTML = ""
        // legend.style.visibility = "hidden"
        // map.fitBounds(outer.getBounds())
      }
    }

    const baseUrl = 'http://localhost:8080/geoserver/BVT/wms?'

    if (currentLayer) {
      map.removeLayer(currentLayer)
    }

    currentLayer = L.tileLayer.wms(baseUrl, {
      layers: `BVT:bua2021revised`,
      transparent: true,
      // tiled: false,
      format: 'image/png'
    }).addTo(map)
    console.log(currentLayer);
    // currentLayer = L.tileLayer.wms('http://localhost:8080/geoserver/BVT/wms?service=WMS&version=1.1.0&request=GetMap&layers=BVT%3Abua2021revised&bbox=648464.6085551732%2C9249009.502066089%2C754135.0371888774%2C9425004.621224409&width=461&height=768&srs=EPSG%3A32748&styles=&format=application/openlayers').addTo(map)
    
    // -----------------------------Get Feature Info
    let getFeatureInfo = async (e) => {
      const point = map.latLngToContainerPoint(e.latlng)
      const params = {
        request: `GetFeatureInfo`,
        service: `WMS`,
        srs: `EPSG:4326`,
        format: `application/json`,
        bbox: map.getBounds().toBBoxString(),
        height: map.getSize().y,
        width: map.getSize().x,
        layers: `BVT:${user}`,
        query_layers: `BVT:${user}`,
        info_format: `application/json`
      }

      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

      const urlFeatureInfo = baseUrl + L.Util.getParamString(params);

      const responseFeatureInfo = await fetch(urlFeatureInfo);
      const dataFeatureInfo = await responseFeatureInfo.json();

      const featureInfo = dataFeatureInfo.features[0].properties["percent"];
      const popupContent = `${featureInfo}`;

      L.popup()
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(map);
    }

    map.off('click');
    map.on('click', (e) => {
      getFeatureInfo(e)
    })

    let getLegendGraphic = async () => {
      let legendGraphic = document.querySelector('.legend')
      if (user !== 'clear') {
        legend.style.visibility = "visible"
        
        const params = {
          request: `GetLegendGraphic`,
          format: `image/png`,
          width: 30,
          height: 30,
          transparent: true,
          layer: `BVT:${user}`,
          legend_options: "fontName:Roboto;fontAntiAliasing:true;fontColor:0x000000;fontSize:14;dpi:100;"
        }
  
        const urlLegend = baseUrl + L.Util.getParamString(params)
        const responseLegend = await fetch(urlLegend)
  
        legendGraphic.src = URL.createObjectURL(await responseLegend.blob())
      }
      else {
        legend.style.visibility = "hidden"
      }
      
    }
    getLegendGraphic()
    
    
    console.log(legend);


  }
}

console.log(buaOption(), 'Dont mind me');