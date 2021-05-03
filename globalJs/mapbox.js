mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYXN0aWFuY2hhY2EiLCJhIjoiY2tmOGw1cndnMDludjJza2ZocDFkM24wZCJ9.-P6AySp4Yeochm3N7zpQOg';
var map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [-58.4603826, -34.5606284], // starting position [lng, lat]
zoom: 13 // starting zoom
});
var marker = new mapboxgl.Marker({
color: "red",
draggable: true
}).setLngLat([-58.4603826, -34.5606284])
.addTo(map)