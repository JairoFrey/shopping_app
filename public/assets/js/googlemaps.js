 
console.log("yes");
// variable which holds all the labels for the markers
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// placeholder for number of labels
var labelIndex = 0;
// this is the google maps variables which shows map exactly where user is
 var map, infoWindow;
 // this is called by the callback in the google api key call
      function initMap() {
        // sets map variable with default location

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        // sets variable for window that the map will show up in
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        // if navigator.geolocation is true...
        if (navigator.geolocation) {
          // gets current position with position being the value being called
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // sets position in the infowindow from pos which was defined earlier
            infoWindow.setPosition(pos);
            // shows alert with message if working
            infoWindow.setContent('Location found.');
            // opens map information in infowindow
            infoWindow.open(map);
            // sets the center of the map as the position which was defined
            map.setCenter(pos);
            // Add a marker at the center of the map based on users location
            addMarker(pos, map);
          }, function() {
           // asks if browser has geolocation, where to open and the center of the map
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
       // if browser has geolocation then sets center as the location
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
       // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(event) {
          addMarker(event.latLng, map);
        });
        
      }
       // Adds a marker to the map.
      function addMarker(location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        var marker = new google.maps.Marker({
          position: location,
          label: labels[labelIndex++ % labels.length],
          map: map
        });

      }