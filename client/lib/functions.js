//need to fix ? promises??
getLocation = function() {
    var latLong = Geolocation.latLng() || false
    console.log(latLong);
    var lat = latLong.lat || 52.5124859
    var long = latLong.lng || 13.4079089
    var loc = {
        lat: lat,
        lng: long
    }
    Session.set('loc', loc)
    return loc

}


cleanLocation = function(badLoc) {

    badLoc = badLoc.trim(1)
    badLoc = badLoc.slice(0, -1)
    badLoc = badLoc.slice(1, badLoc.length)

    badLoc = badLoc.replace(/ /g, '');

    badLoc = badLoc.split(',')

    console.log(badLoc);

    goodloc = {
        lat: badLoc[0],
        long: badLoc[1]

    }
    return badLoc;
}
