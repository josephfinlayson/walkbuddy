'use strict';
var marker;
var latLong = getLocation();

Template.postWalk.rendered = function() {
    // console.log(Geolocation)
    GoogleMaps.init({
            'sensor': true, //optional
            'key': 'AIzaSyC8H-gi_9uwLtbBOROVQ4n18eeAO57h7L4', //optional
            'language': 'de' //optional
        },
        function() {
            var mapOptions = {
                zoom: 15,
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            map.setCenter(new google.maps.LatLng(latLong.lat, latLong.lng));
            google.maps.event.addListener(map, 'click', function(clickPoint) {
                var clickLatLong = clickPoint.latLng;
                populateForm(clickLatLong)
                dropMarker(clickLatLong, map)
            });
        }
    );

}

var dropMarker = function(latLong, map) {
    if (marker) {
        marker.setMap(null)
    }
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: latLong
    });

    // google.maps.event.addListener(marker, 'click', toggleBounce);
}

var populateForm = function(latLong) {
    Session.set('location', latLong.toString())
}

Template.postWalk.helpers({
    location: function() {
        return Session.get('location')
    }
})

Template.postWalk.events({
    'submit form': function(event, template) {
        event.preventDefault();
        var location, talkAbout, when;
        location = template.find('#location');
        talkAbout = template.find('#talkAbout');
        when = template.find('#when');

        // Do form validation
        var location = cleanLocation(location.value);
        var data = {
            location: location,
            talkAbout: talkAbout.value,
            when: when.value,
            twitterHandle: Meteor.user().services.twitter.screenName
        };

        location.value = '';
        talkAbout.value = '';
        when.value = '';

        Walks.insert(data, function(err) {
            if (!err) {

                alert("Walk successfully submitted")
            }
        });

    }
});
