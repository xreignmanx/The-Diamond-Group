var config = {
    apiKey: "AIzaSyDiCnqy7WYpwEt2xUy8QzQnCTapyM80UJQ",
    authDomain: "click-force.firebaseapp.com",
    databaseURL: "https://click-force.firebaseio.com",
    projectId: "click-force",
    storageBucket: "click-force.appspot.com",
    messagingSenderId: "1011685563387"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var inEmail = "";
  var inPass = "";


function updateTime(){
    $(".current-time").html(moment().format('MMMM Do YYYY, h:mm:ss a')); 
}

$(document).ready(function(){
    setInterval(updateTime, 1000);
    
    $("#submit").on("click", function(){
        window.open('gamepage.html')
    })
    
})
//  On click for the submit button
$("#submit").on("click",function(event) {
    event.preventDefault();

var inEmail = $("#exampleInputEmail1").val().trim();
var inPass = $("#exampleInputPassword1").val().trim();
 
//  Create local Object to store values
    var newUser = {
        Name: inEmail,
        password: inPass,
    };
 console.log(newUser);
// Upload submitted data to Firebase

    database.ref().push(newUser);

    alert("New User has been added!");

    // Clear input fields
            $("#exampleInputEmail1").val("");
            $("#exampleInputPassword1").val("");
}); 

// Add Object to a row in Firebase
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

//  Create variables for the inputs from the Object
  
    var inEmail = (childSnapshot.val().Name);
    var inPass = (childSnapshot.val().password);
});