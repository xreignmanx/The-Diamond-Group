$(document).ready(function () {
    $("#onebutton").on("click", function () {

        console.log($(this).attr("name"))

        var person = $(this).attr("name");
        var queryURL = "https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_Lu6bJdM0nN1diL9EVLJGlKU1wie9w&emailAddress=support@whoisxmlapi.com"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var theresponse =response
            var results = response.data;
            console.log(results)
            console.log(theresponse)

        })
    })
})
