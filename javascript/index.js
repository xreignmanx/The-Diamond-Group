var config = {
    apiKey: "AIzaSyDiCnqy7WYpwEt2xUy8QzQnCTapyM80UJQ",
    authDomain: "click-force.firebaseapp.com",
    databaseURL: "https://click-force.firebaseio.com",
    projectId: "click-force",
    storageBucket: "",
    messagingSenderId: "1011685563387"
};

firebase.initializeApp(config);

var database = firebase.database();

// firebase.auth().onAuthStateChanged(function(user){
//     if(user){
//         document.getElementById("submit").style.display = "block";
//         document.getElementById("").style.display = "none";

//         var user = firebase.auth().currentUser;

//         if (user != null){
//             var email_id = user.email;
//             var email_verified = user.emailVerified;
//             document.getElementById("user_para").innerHTML = "Welcome User: " + email_id + "verified: " + email_verified;

//         }
//     } else {
//         document.getElementById("") = none;
//         document.getElementById("") = none;
//     }
// });

/*
 "inputGroupSelect01" ID for region (registration)
 exampleInputPassword1 ID for password
 exampleInputEmail1 ID for email
 lastName ID for last Name
 firstName ID for first Name
*/

function writeRegistrationData(firstname, lastname, email, password, region) {
    database.ref('users/' + username).push().set({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        region: region
    });
};

function login(){
    var userEmail = document.getElementById("exampleInputEmail1").value;
    var userPass = document.getElementById("exampleInputPassword1").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
    });
}

function register() {

    var firstName = document.getElementById("firstName").value;
    console.log(firstName)
    var lastName = document.getElementById("lastName").value;
    console.log(lastName)
    var region = document.getElementById("inputGroupSelect01").value
    console.log(region)
    var userEmail = document.getElementById("exampleInputEmail1").value;
    var userPass = document.getElementById("exampleInputPassword1").value;
    
    
    writeRegistrationData(firstName, lastName, region, userEmail, userPass)
    
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + errorMessage);
    });
}

function SignOut(){
    firebase.auth().signOut();
}

function send_verification(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function(){
        window.alert("verification email sent!");
    }).catch(function(error){
        window.alert("there was an error");
    });
}