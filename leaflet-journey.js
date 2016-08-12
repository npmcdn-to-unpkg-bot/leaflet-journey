var mymap = L.map('mapid').setView([46.85, 2.3518], 6);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 1,
        maxZoom: 18,
    }).addTo(mymap);

    // Cities
    // Paris
    var paris = [48.8588, 2.3470];
    // Nantes
    var nantes = [47.2383, -1.5603];
    // Lyon
    var lyon = [45.7577, 4.8350];
    // Vallon-Pont-D'arc
    var vallon = [44.3983, 4.4024];
    // Montpellier
    var montpellier = [43.6100, 3.8742];
    // Bayonne
    var bayonne = [43.4844, -1.4612];
    // Chambéry
    var chambery = [45.5823, 5.9064];
    // Munich
    var munich = [48.1550, 11.5418];
    // Liberec
    var liberec = [50.7662, 15.0499];
    // Prague
    var prague = [50.0598, 14.4656];

    // Lines
    // Paris to Nantes
    // Nantes to Lyon
    // Lyon to Vallon-Pont-D'arc
    // Vallon-Pont-D'arc to Montpellier
    // Montpellier to Bayonne
    // Bayonne to Chambéry
    // Chambéry to Paris
    // Paris to Munich
    // Munich to Liberec
    // Liberec to Prague
    // Prague to Paris

    // Markers
    var paris_marker = L.marker(paris);
    var nantes_marker = L.marker(nantes);
    var lyon_marker = L.marker(lyon);
    var vallon_marker = L.marker(vallon);

    // Icons
    var bikeIcon = L.icon({
        iconUrl: 'images/marker-bike.png',
        iconSize: [45, 45],
        iconAnchor: [24, 43],
        shadowUrl: null
    });
    var trainIcon = L.icon({
        iconUrl: 'images/marker-train.png',
        iconSize: [45, 45],
        iconAnchor: [24, 43],
        shadowUrl: null
    });

    var line1 = L.polyline([paris, nantes]);
    var animatedMarker1 = L.animatedMarker(line1.getLatLngs(), {
        autoStart: false,
        distance: 300,
        interval: 1500,
        zIndexOffset: 1000,
        icon: trainIcon,
        onEnd: function() {
            // Remove marker from map
            mymap.removeLayer(this);
        }
    });

    var line2 = L.polyline([nantes, lyon]);
    var animatedMarker2 = L.animatedMarker(line2.getLatLngs(), {
        autoStart: false,
        distance: 300,
        interval: 1500,
        zIndexOffset: 1000,
        icon: trainIcon,
        onEnd: function() {
            // Remove marker from map
            mymap.removeLayer(this);
        }
    });

    var step1 = function() {
        paris_marker.addTo(mymap);
        animatedMarker1.addTo(mymap).start();
        setTimeout(function() {
            line1.addTo(mymap).snakeIn()
            .on('snakeend', function() {
                step2();
            });
        }, 1500);
    }

    var step2 = function() {
        nantes_marker.addTo(mymap);
        animatedMarker2.addTo(mymap).start();
        setTimeout(function() {
            line2.addTo(mymap).snakeIn()
            .on('snakeend', function() {
                step3();
            });
        }, 1500);
    }

    var step3 = function() {
        lyon_marker.addTo(mymap);
    }

    step1();