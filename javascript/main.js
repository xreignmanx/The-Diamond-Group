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

var actionCodeSettings = {
    url: "file:///C:/Users/SoleS/Desktop/Visual%20Studio%20Code/BootCamp/Homework%20Assignments/The-Diamond-Group/index.html",
    // This must be true.
    handleCodeInApp: true
};

/*
 "inputGroupSelect01" ID for region (registration)
 exampleInputPassword1 ID for password
 exampleInputEmail1 ID for email
 lastName ID for last Name
 firstName ID for first Name
*/

function refresh(){
    window.parent.location = window.parent.location.href;
}

firebase.auth().onAuthStateChanged(firebaseUser => {
    console.log("auth state detected");
    if (firebaseUser) {
        console.log(firebaseUser.Qb.Qb);
        console.log("logged in")  
        $("#signoutButton").show() 
        $("#exampleInputEmail1").remove();
        $("#exampleInputPassword1").remove();
        $("#signinButton").remove();
        $("label").remove();
        $("#signinlabel").remove();

    } else {
        console.log('not logged in');
        $("#signoutButton").hide(); 
    
    }
})

function login() {
    
    var userEmail = document.getElementById("exampleInputEmail1").value;
    var userPass = document.getElementById("exampleInputPassword1").value;

    const promise = firebase.auth().signInWithEmailAndPassword(userEmail, userPass)//.catch(function (error) {

    promise.catch(e=>alert(e.message));

    firebase.auth().onAuthStateChanged(firebaseUser => {
        console.log("auth state detected");
        if (firebaseUser) {
            $("#signoutButton").html('<button class="btn btn-action hide" id="signoutButton" onclick="SignOut()">Sign Out</button>');
        }
    })
    
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

    var userEmail = document.getElementById("exampleInputEmail1").value;
    var userPass = document.getElementById("exampleInputPassword1").value;

    writeRegistrationData(firstName.value, lastName.value, userEmail, userPass, region.value, score, gold);
    console.log("created?")

    const promise = auth.createUserWithEmailAndPassword(userEmail, userPass);
    // promise.catch(e=>console.log(e.message));
    var user = firebase.auth().currentUser;

    promise.then(function(user) {
        user.sendEmailVerification().then(function(){
            window.alert("email sent")
        }, function(error){
            console.log(error.message)
        })
    });

    window.localStorage.setItem('emailForSignIn', userEmail);

    // firebase.auth().sendSignInLinkToEmail(userEmail, actionCodeSettings).then(function () {
    //         // The link was successfully sent. Inform the user.
    //         // Save the email locally so you don't need to ask the user for it again.
    //         // if they open the link on the same device.
    //         window.localStorage.setItem('emailForSignIn', userEmail);
    //     })
    //     .catch(function (error) {
    //         if (!error) {
    //             console.log("created");
    //             window.open('registration_finished.html');
    //         } else {
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    
    //         window.alert("Error: " + errorMessage);
    //     }
    // });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        
        if (firebaseUser) {
            console.log(firebaseUser.Qb.Qb);
            window.location.replace("registration_finished.html");
        } 
    });   
}

function SignOut() {
    console.log("Logged Out");
    firebase.auth().signOut();
    window.parent.location = window.parent.location.href;
}

// function send_verfication(){
//     var user = firebase.auth().currentUser;
//     user.sendEmailVerification().then(function(){
//         window.alert("check email for verification")
//     }).catch(function(error){
//         let errorMessage = error.message;
//         console.log(errorMessage);
//     })
// }

function updateTime() {
    $(".current-time").html(moment().format('MMMM Do YYYY, h:mm:ss a'));
}

$(document).ready(function () {
    setInterval(updateTime, 1000);

    firebase.auth().onAuthStateChanged(firebaseUser => {
        console.log("auth state detected");
        if (firebaseUser) {
            $("#play").show();
            $("#play").on("click", function(){
                localStorage.getItem(firebaseUser.score);
                localStorage.getItem(firebaseUser.gold);
                window.parent.location = window.open("gamepage.html")
            });
        } else {
            $("#play").hide();    
        };
    })   
})


// right now if you got to the sign in page, and try to sign in, it will sign you in but the signout button won't appear
// you have to refresh in order for the signout button to appear, but we are trying to go to the game page if the user
// is a firebase user.

// The registration page works and if everything is there it automatically logs you in