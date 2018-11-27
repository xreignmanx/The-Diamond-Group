var config = {
    apiKey: "AIzaSyDiCnqy7WYpwEt2xUy8QzQnCTapyM80UJQ",
    authDomain: "click-force.firebaseapp.com",
    databaseURL: "https://click-force.firebaseio.com",
    projectId: "click-force",
    storageBucket: "",
    messagingSenderId: "1011685563387"
};

firebase.initializeApp(config);

function updateTime(){
    $(".current-time").html(moment().format('MMMM Do YYYY, h:mm:ss a')); 
}

// function emailAPI() {
//     var object = $(this).attr("noattribute");
//     var queryURL = "";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         var results = response.data;
//         console.log(results)
//     })
// }

$(document).ready(function(){
    setInterval(updateTime, 1000);

    $("#submit").on("click", function(){
        //needs user validation before actually opening the page but the conecpt is there

        window.open('gamepage.html')
    })
    
})