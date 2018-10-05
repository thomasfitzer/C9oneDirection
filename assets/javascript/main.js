
$(document).ready(function() {

    navigator.geolocation.getCurrentPosition(function(position) {
    })

    

    $(".input-group-btn").on("click", function () {
        event.preventDefault();
        clearResults();
    
        var userSearch = $(".form-control").val().trim();


        console.log(userSearch);

        jQuery.ajaxPrefilter(function(options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://ca329482.herokuapp.com/' + options.url;
            }
        });
        
        // Yelp API
        var yelpSearch = {
            // "async": true,
            "crossDomain": true,
            "url": "https://api.yelp.com/v3/businesses/search?term=" + userSearch + "&categories=c_and_mh&latitude=" + currentLatitude + "&longitude=" + 
            currentLongitude + "&limit=10",
            "method": "GET",
         
            "headers": {
              "Authorization": "Bearer VWbhyLltz59Mh602g6qzpH1spLdhVXPxvoh5GtKU-DmX2fEpT74efdY49dc2HmiDzq_C6X7Y1TyyouOP_phphh8Kz6VHV2iv105lfj85vLTNUBxpsCjURH3YRDe2W3Yx",
            //   "Content-Type": "application/json"
            //   "Cache-Control": "no-cache",
            //   "Postman-Token": "24057fea-5aa1-434c-a8b8-b01e31ead0da"
            "Access-Control-Allow-Origin": "*"
            }
          }
            
          // AJAX request Yelp
          $.ajax(yelpSearch).done(function (response) {
            console.log(response);
            var response = response.businesses;
            
            // Results loop
            for (i=0; i < response.length; i++) {
                console.log(response[i].name);
                var rowGuy = $("<div class='row'>");
                var colGuy = $("<div class='col-lg-12'>");
                var yelpDiv = $("<div class='card'>");
                var yelpImage = response[i].image_url;
            
                var name = response[i].name;
                var location = response[i].location.address1;
                var phone = response[i].display_phone;
                var link = response[i].url;
                
                // Appending results
                yelpDiv.append("<div class='card-header'>" + name +
                 "</div><div class='card-body'><img width='250' height='250' src='" + yelpImage + 
                 "'><p class='card-text'>" + location + "</p><p class='card-text'>Phone: " + phone + "</p><a href='" +
                 link + "' class='btn btn-primary'>Visit provider</a></div>");


                colGuy.append(yelpDiv);
                rowGuy.append(colGuy);
                $("#dump-here").append(rowGuy);
            }

          });
            
          function clearResults() {
              $("#dump-here").empty();
          }


        });

        });
