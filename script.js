// let nycMap;
// nycMap = L.map("map");

const key = '4MI1kZBuj2ZQXMrlxErQ';
const nycMap = L.map('map').setView([40.75677796290958, -73.93734418892154], 12);
// L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{
//   tileSize: 512,
//   zoomOffset: -1,
//   minZoom: 1,
//   attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
//   crossOrigin: true
// }).addTo(nycMap);
const mtLayer = L.maptilerLayer({
    style: "https://api.maptiler.com/maps/1cffecf0-e8a8-47fd-a666-baf9cb9db155/style.json?key=4MI1kZBuj2ZQXMrlxErQ",
}).addTo(nycMap);




// create tile layer
// var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 20
// }).addTo(nycMap);

// nycMap.setView([40.767717, -73.9717470], 12);




//Add galleries
//Set Z Index
const galleries = axios('https://github.com/patriciabelen/FOSS-Leaflet/blob/main/data/galleries.geojson').then(resp => {
    var geojsonMarkerOptions = {
        radius: 2,
        fillColor: "#ff0000",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };

    L.geoJSON(resp.data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.name) {
                // show popup
                const popupSmall = { className: "gallPopup" };
                layer.bindPopup("<p>" + feature.properties.name + "</p>", popupSmall); 
            }
        }
    }).addTo(nycMap).bringToFront();

});

//Neighborhoods area
const hoods = axios('https://github.com/patriciabelen/FOSS-Leaflet/blob/main/data/neighborhoods.json').then(resp => {

    L.geoJSON(resp.data, {

        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.neighborhood) {
                // show popup
                const popupOptions = { className: "hoodsPopup" };
                layer.bindPopup("<p>" + feature.properties.neighborhood + "</p>", popupOptions); 
            }
        },

        style: { opacity: 0.95, color: "#000", weight: 2 }
    }).addTo(nycMap).bringToBack();

});