$(document).ready(function(){
    $(".input-group-btn").on("click",function(event) {
        var userSearch = $(".form-control").val().trim()
        queryURL="https://api.fda.gov/drug/event.json?api_key=2hkdwDIItI5PuX5ixDLDGLU0jQNuXzufK2JiOHIk&search=patient.reaction.reactionmeddrapt:"+ userSearch + "&limit=1"
        
        console.log("hi")
        
        $.ajax({
            url:queryURL,
            method: "GET",
        }).then(function(response){
            var str = JSON.stringify(response)
            $("#form-control").text(str);
            console.log(response);
        });
        });
        
})
