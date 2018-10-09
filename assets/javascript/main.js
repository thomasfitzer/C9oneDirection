
$(document).ready(function () {

    $(".drug").hide();


    $(".input-group-btn").on("click", function (event) {
        event.preventDefault();
        resultslink();
        clearResults();
        $(".drug").show();

        var userSearch = $(".form-control").val().trim();

        // If location is not received, timeout error
        function locationNotReceived(positionError) {
            console.log(positionError);
        };
        // Checking for geolocation ability in browser 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, locationNotReceived, {timeout: 20000});    
        };


        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://ca329482.herokuapp.com/' + options.url;
            }
        });
        
        // Position function & Yelp API
        function showPosition(position) {
            var latitude = position.coords.latitude
            var longitude = position.coords.longitude 
            
            console.log(latitude);
            console.log(longitude);

            // Yelp API
            var yelpSearch = {  
                // "async": true,
                "crossDomain": true,
                "url": "https://api.yelp.com/v3/businesses/search?term=" + userSearch + "&categories=c_and_mh&latitude=" + latitude + "&longitude=" 
                    + longitude + "&limit=10",
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
                // console.log(response);
                var response = response.businesses;

                // Results loop
                for (i = 0; i < response.length; i++) {
                    // console.log(response[i].name);
                    var rowGuy = $("<div class='row'>");
                    var colGuy = $("<div class='col-lg-12'>");
                    var yelpDiv = $("<div class='card'>");
                    var yelpImage = response[i].image_url;

                    var name = response[i].name;
                    var location = response[i].location.address1;
                    var phone = response[i].display_phone;
                    var link = response[i].url;

                    // Appending results
                    yelpDiv.append("<div class='card-header'><h4>" + name +
                        "</h4></div><div class='card-body'><img width='250' height='250' src='" + yelpImage +
                        "'><p class='card-text'>" + location + "</p><p class='card-text'>Phone: " + phone + "</p><a href='" +
                        link + "' class='btn btn-primary'>Visit provider</a></div>");

                    colGuy.append(yelpDiv);
                    rowGuy.append(colGuy);
                    $("#dump-yelp-here").append(rowGuy);
                }


            });

    };




        var userSearch = $(".form-control").val().trim()
        queryURL = "https://api.fda.gov/drug/event.json?api_key=2hkdwDIItI5PuX5ixDLDGLU0jQNuXzufK2JiOHIk&search=patient.reaction.reactionmeddrapt:" + userSearch + "&limit=1"

        // console.log("hi")
        // console.log(userSearch, "this is the second user serach")


        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var response = response.results;

            for (i = 0; i < response.length; i++) {
                // console.log(response, "response")
                // console.log(response[i].patient.drug, "patient drug")
                let result = response[i].patient.drug

                for (j = 0; j < result.length; j++) {
                    var name = JSON.stringify(result[j].medicinalproduct);
                    var product = JSON.stringify(result[j].openfda.manufacturer_name);
                    $("#form-control").text(name);
                    let reactions = response[i].patient.reaction;
                    let reactionRow = $("<tr>");

                    for (k = 0; k < reactions.length; k++) {
                        var symptom = reactions[k].reactionmeddrapt;
                        // console.log(symptom, "symptom");
                        var td3 = $('<td>').html(symptom);
                        reactionRow.append(td3);
                        $(".table tbody").append(row);
                    }

                    var row = $("<tr>");
                    var td1 = $('<td>').html(name);
                    var td2 = $('<td>').html(product);
                    var td3 = $('<td>').html(symptom);


                    td1.addClass("text-center");
                    td2.addClass("text-center");
                    td3.addClass("text-center");
                    row.addClass("text-center");
                    

                    row.append(td1, td2, td3);
                    $(".table tbody").append(row);
                    
                }


            }



        });

        function clearResults() {
            $("#dump-yelp-here").empty();
            $(".table tbody").empty();
        }
        // was var word_id
        var userSearch = $(".form-control").val().trim();

        const source_lang = 'en';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://od-api.oxforddictionaries.com/api/v1/entries/"+source_lang+"/" + userSearch,
            "method": "GET",
            "headers": {
              "app_id": "b89ebb75",
              "app_key": "c30b9aa90fe3af2223ed4d70da7bf75e",
              "Cache-Control": "no-cache",
              "Postman-Token": "e42a6e83-4019-4c34-954c-98818ae3bf2d"
            }
          }
          
          $.ajax(settings).done(function (response) {
            var definitions = response.results[0].lexicalEntries[0].entries[0].senses;
             for (let d = 0; d < definitions.length; d++) {
                 let resultDef = definitions[d].definitions[0];
                // console.log(resultDef)
                //appen here
             }
            //   console.log("hihihihihihihihihihi")
            // console.log(definitions);
          });
        
    });
        function resultslink () {
            window.location.hash = "";
            window.location.hash = "#results";
        }
})