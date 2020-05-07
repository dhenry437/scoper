mapboxgl.accessToken = 'pk.eyJ1IjoiZGhlbnJ5NDM3IiwiYSI6ImNrOXY3cjUxNjA5cDQzZHBrc2w1N3M4em4ifQ.hzae72u-br3ad-rYz_2h2g';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', //'mapbox://styles/dhenry437/ck9v860rb00dp1inpfefyxgww'
    center: { lat: -37.8136, lng: 144.9631 },
    zoom: 12,
    keyboard: true
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        collapsed: true
    })
);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);