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

const auth = firebase.auth();

let score = 0;
let gold = 0

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var region = document.getElementById("inputGroupSelect01");
var userEmail = document.getElementById("exampleInputEmail1");
var userPass = document.getElementById("exampleInputPassword1");

// var actionCodeSettings = {
//     url: "file:///C:/Users/SoleS/Desktop/Visual%20Studio%20Code/BootCamp/Homework%20Assignments/The-Diamond-Group/index.html",
//     // This must be true.
//     handleCodeInApp: true
// };
/*
 "inputGroupSelect01" ID for region (registration)
 exampleInputPassword1 ID for password
 exampleInputEmail1 ID for email
 lastName ID for last Name
 firstName ID for first Name
*/

auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);  
        signoutButton.classList.remove('hide');

    } else {
        console.log('not logged in');
        signoutButton.classList.add('hide'); 

    }
})

function login() {
    
    var userEmail = document.getElementById("exampleInputEmail1").value;
    var userPass = document.getElementById("exampleInputPassword1").value;

    auth.signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
         if (!error){
             console.log("Logged in")
         }
    });
}

function register() {

    function writeRegistrationData(firstname, lastname, email, password, region, score, gold) {
        database.ref('users/' + firstname).push().set({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            region: region,
            Score: score,
            Gold_Amount: gold
        });
    };

    writeRegistrationData(firstName.value, lastName.value, userEmail.value, userPass.value, region.value, score, gold)

    firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPass.value).catch(function (error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
        if (!error){
            console.log("created")
        }
    });

    // firebase.auth().sendSignInLinkToEmail(userEmail.value, actionCodeSettings)
    //     .then(function () {
    //         // The link was successfully sent. Inform the user.
    //         // Save the email locally so you don't need to ask the user for it again
    //         // if they open the link on the same device.
    //         window.localStorage.setItem('emailForSignIn', email);
    //     })
    //     .catch(function (error) {
    //         // Some error occurred, you can inspect the code: error.code
    //     });

    window.open('registration_finished.html');
}

function SignOut() {
    console.log("Logged Out");
    firebase.auth().signOut();
    window.open("index.html");
}

function updateTime() {
    $(".current-time").html(moment().format('MMMM Do YYYY, h:mm:ss a'));
}

$(document).ready(function () {
    setInterval(updateTime, 1000);

})