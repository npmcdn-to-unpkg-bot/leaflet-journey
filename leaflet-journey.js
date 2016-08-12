(function() {
    'use strict';

    /*
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
    */

    // Steps
    var routes = [
        {
            // From Paris to Nantes
            from: [48.8588, 2.3470],
            to: [47.2383, -1.5603],
            transportation: 'train'
        }, {
            // From Nantes to Lyon
            from: [47.2383, -1.5603],
            to: [45.7577, 4.8350],
            transportation: 'train'
        }, {
            // From Lyon to Vallon-Pont-D'arc
            from: [45.7577, 4.8350],
            to: [44.3983, 4.4024],
            transportation: 'bike'
        }, {
            // From Vallon-Pont-D'arc to Montpellier
            from: [44.3983, 4.4024],
            to: [43.6100, 3.8742],
            transportation: 'bike'
        }, {
            // From Montpellier to Bayonne
            from: [43.6100, 3.8742],
            to: [43.4844, -1.4612],
            transportation: 'bike'
        }, {
            // From Bayonne to Chambéry
            from: [43.4844, -1.4612],
            to: [45.5823, 5.9064],
            transportation: 'train'
        }, {
            // From Chambéry to Paris
            from: [45.5823, 5.9064],
            to: [48.8588, 2.3470],
            transportation: 'car'
        }, {
            // From Paris to Munich
            from: [48.8588, 2.3470],
            to: [48.1550, 11.5418],
            transportation: 'plane'
        }, {
            // From Munich to Liberec
            from: [48.1550, 11.5418],
            to: [50.7662, 15.0499],
            transportation: 'train'
        }, {
            // From Liberec to Prague
            from: [50.7662, 15.0499],
            to: [50.0598, 14.4656],
            transportation: 'train'
        }, {
            // From Prague to Paris
            from: [50.0598, 14.4656],
            to: [48.8588, 2.3470],
            transportation: 'plane'
        }
    ];

    // Icons
    var bikeIcon = L.icon({
        iconUrl: 'images/marker-bike.png',
        iconSize: [45, 45],
        iconAnchor: [24, 43],
        shadowUrl: null
    });
    var carIcon = L.icon({
        iconUrl: 'images/marker-car.png',
        iconSize: [45, 45],
        iconAnchor: [24, 43],
        shadowUrl: null
    });
    var planeIcon = L.icon({
        iconUrl: 'images/marker-plane.png',
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

    var myIcon = function() {
        return bikeIcon;
    }

    var mymap = L.map('mapid').setView([46.85, 2.3518], 6);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 1,
        maxZoom: 18,
    }).addTo(mymap);

    var line;
    var generateLine = function(i) {
        L.marker(routes[i].from).addTo(mymap);
        line = L.polyline([routes[i].from, routes[i].to]);
        var mmm = L.animatedMarker(line.getLatLngs(), {
            autoStart: false,
            distance: 300,
            interval: 1500,
            zIndexOffset: 1000,
            onEnd: function() {
                // Remove marker from map
                mymap.removeLayer(this);
            }
        });
        switch(routes[i].transportation) {
            case 'bike' :
                mmm.setIcon(bikeIcon);
                break;
            case 'car' :
                mmm.setIcon(carIcon);
                break;
            case 'plane' :
                mmm.setIcon(planeIcon);
                break;
            case 'train' :
                mmm.setIcon(trainIcon);
                break;
        }
        
        mmm.addTo(mymap).start();
        setTimeout(function() {
            line.addTo(mymap).snakeIn()
            .on('snakeend', function() {
                if(i < routes.length - 1) {
                    generateLine(i + 1);
                }
            });
        }, 1500);
    }

    generateLine(0);

})();