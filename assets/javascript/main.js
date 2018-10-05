$(document).ready(function () {
    $(".input-group-btn").on("click", function (event) {
        var userSearch = $(".form-control").val().trim()
        queryURL = "https://api.fda.gov/drug/event.json?api_key=2hkdwDIItI5PuX5ixDLDGLU0jQNuXzufK2JiOHIk&search=patient.reaction.reactionmeddrapt:" + userSearch + "&limit=1"

        console.log("hi")


        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            var response = response.results;
            
            for (i = 0; i < response.length; i++) {
                console.log(response)
                console.log(response[i].patient.drug)
                let result = response[i].patient.drug
            
                for (j = 0; j < result.length; j++) {
                    var name = JSON.stringify(result[j].medicinalproduct);
                    var product = JSON.stringify(result[j].openfda.manufacturer_name);
                    $("#form-control").text(name);
                    let reactions = response[i].patient.reaction;
                    let reactionRow = $("<tr>");
                    
            for (k = 0; k <reactions.length; k++){
                        var symptom = reactions[k].reactionmeddrapt
                        console.log(symptom)
                        var td3 = $('<td>').html(symptom);
                        reactionRow.append(td3);
                        $(".table tbody").append(row);
                    }

                    var row = $("<tr>");
                    var td1 = $('<td>').html(name);
                    var td2 = $('<td>').html(product);
                    var td3 = $('<td>').html(symptom);

                    row.append(td1, td2,symptom);
                    $(".table tbody").append(row);
                }
                
                
            }



        });
    });

});
