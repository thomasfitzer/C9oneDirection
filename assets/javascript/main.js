
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
                "url": "https://api.yelp.com/v3/businesses/search?term=" + userSearch + "&categories=c_and_mh,physicians,addictionmedicine,familydr,psychiatrists,pharmacy,rehabiliation_center&latitude=" + latitude + "&longitude=" 
                    + longitude + "&limit=10&radius=40000",
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
                    var yelpLatitude = response[i].coordinates.latitude;
                    var yelpLongitude = response[i].coordinates.longitude;
                    
                    // Appending results
                    // yelpDiv.append("<div class='card-header'><h4>" + name +
                    //     "</h4></div><div class='card-body'><div class='row'><div class='col-lg-8'><img width='250' height='250' src='" + yelpImage +
                    //     "'><p class='card-text'>" + location + "</p><p class='card-text'>Phone: " + phone + "</p><a href='" +
                    //     link + "' class='btn btn-primary'>Visit provider</a></div><div class='col-lg-4'></div></div></div>");
                        
                        var cardDiv = $("<div>");
                            cardDiv.addClass("card-header");
                            var headerName = $("<h4>");
                            headerName.text(name);
                        cardDiv.append(headerName);
                    
                    yelpDiv.append(cardDiv);

                        var cardBody = $("<div>")
                            cardBody.addClass("card-body");
                    yelpDiv.append(cardBody); 

                        var cardRow = $("<div>");
                            cardRow.addClass("row");
                    
                    cardBody.append(cardRow);
                // Image result from Yelp 
                        var colOne = $("<div>");
                            colOne.addClass("col-lg-4");
                    cardRow.append(colOne);
                        
                        var imgGuy = $("<img>");
                            imgGuy.attr("width", 250);
                            imgGuy.attr("height", 250);
                            imgGuy.attr("src", yelpImage);
                    colOne.append(imgGuy);
                // Information and link to Yelp result 
                        var colTwo = $("<div>");
                            colTwo.addClass("col-lg-4");
                            colTwo.addClass("text-center");
                    cardRow.append(colTwo);

                        var firstP = $("<p>");
                            firstP.addClass("card-text");
                            firstP.addClass("text-left");
                            firstP.text(location);
                    colTwo.append(firstP);

                        var secondP = $("<p>");
                            secondP.addClass("card-text");
                            secondP.addClass("text-left");
                            secondP.text("Phone: " + phone);
                    colTwo.append(secondP);

                        var buttonGuy = $("<a>");
                            buttonGuy.attr("href", link);
                            buttonGuy.addClass("btn");
                            buttonGuy.addClass("text-center");
                            buttonGuy.addClass("btn-primary");
                            buttonGuy.text("Visit Provider");
                    colTwo.append(buttonGuy);
                    // Google maps location of provider 
                        var colThree = $("<div>");
                            colThree.addClass("col-lg-4");
                            // Google Maps API
                            var mapGuy = $("<iframe>");
                            mapGuy.attr("width", 300);
                            mapGuy.attr("height", 250);
                            mapGuy.attr("src", "https://www.google.com/maps/embed/v1/view?key=AIzaSyB7S0lp264tn9L58xuL22mtADYmBF4Ke_c&zoom=15&maptype=roadmap&center="
                            + yelpLatitude + "," + yelpLongitude) 
                   
                    colThree.append(mapGuy);
                    cardRow.append(colThree);     

                    colGuy.append(yelpDiv);
                    rowGuy.append(colGuy);
                $("#dump-yelp-here").append(rowGuy);
                        
                };

                 
                    
                

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
            $("#defineHere").empty();
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
                    console.log(resultDef);
                    var defineThis = $("<p>").text(resultDef);
                    defineThis.addClass("p-2");
                    defineThis.attr("id", "definitionResults")
                    $("#defineHere").append(defineThis);

             }
            
          });
        
    });
        function resultslink () {
            window.location.hash = "";
            window.location.hash = "#results";
        }
})