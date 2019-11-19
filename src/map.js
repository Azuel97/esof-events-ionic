const DATA = require('./data.js')
const eventsPOI = DATA.map.geojson

module.exports = {
  name: "Map",
  version: "0.1",
  render: function(){
    console.log('*** Render Map ****')
    // MAP INIT
    console.log("Leaflet", L)  // -> L è una variabile che contiene tutta la libreria
    // Metodo per inizializzare la mappa e crearla dandoli come setView la longitudine,latidunine e zoom
    const myMap = L.map("mapView").setView([45.6522854, 13.7661518], 14)

    // Aggiungo la basemap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar', 
        attribution: 'Power by ITS - Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(myMap);

    // Aggiungo gli POI, ovvero i point
    L.geoJSON(eventsPOI).addTo(myMap)  

    // Ascolto il cambio di tab
    const tabs = document.querySelector("#tabs")
    tabs.addEventListener("ionTabsDidChange", (event) => {
        if(event.detail.tab === "map"){
            console.log("MAP TAB : ionTabsDidChange ", event.detail.tab)
            // trick calcolo dimensioni dom
            setTimeout(function () {
                console.log("sleep")
                myMap.invalidateSize()
            }, 100)
            
        }
    })

  }
}