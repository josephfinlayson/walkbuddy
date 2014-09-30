'use strict';
// $('#map-canvas').innerHTML = '';
// delete map;

var latLong = getLocation();

Template.findWalk.rendered = function() {

    GoogleMaps.init({},
        //     'sensor': true, //optional
        //     'key': 'MY-GOOGLEMAPS-API-KEY', //optional
        //     'language': 'de' //optional
        // },
        function() {
            var mapOptions = {
                zoom: 12,
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            map.setCenter(new google.maps.LatLng(latLong.lat, latLong.lng));

            var dbData = getMarkersFromDB()
            var orgData = organiseData(dbData)
            putMarkersonPage(orgData, map)
        }
    );

}

var organiseData = function(dbData) {
    dbData.forEach(function(data) {
    })
    return dbData;
}
var getMarkersFromDB = function() {
    var allWalks = Walks.find().fetch()
    return allWalks
}

var putMarkersonPage = function(orgData, map) {

    orgData.forEach(function(data) {
        var mapLocation = new google.maps.LatLng(data.location[0], data.location[1])
        var marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: mapLocation,
            customInfo: data
        });

        google.maps.event.addListener(marker, 'click', function() {
            console.log("clicked");
            populateFields(this.customInfo);
        });

    })

}

var populateFields = function(stuff) {
    Session.set('walker', stuff.twitterHandle)
    Session.set('when', stuff.when)
    Session.set('talkAbout', stuff.talkAbout)
}


Template.findWalk.helpers({
    walker: function() {
        return Session.get('walker')
    },
    talkAbout: function() {
        return Session.get('talkAbout')
    },
    when: function() {
        return Session.get('when')
    }
});
