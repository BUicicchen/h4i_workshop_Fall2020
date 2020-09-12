
var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid;
    var email;
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            uid = user.uid;
            email = user.email;
        } else {
            uid = null;
            window.location.replace("login.html");
        }
    });


    function logOut() {
        firebase.auth().signOut();
    }

    function saveUser() {
        const form = document.querySelector('#personal-info-form');       // returns form the object
        form.addEventListener('submit', function(event) {                 // submit or click
            event.preventDefault();                                       // stop forms from automatically submitting when the submit button is clicked, giving you a chance to instead submit the form data to firebase
            firebase.firestore().collection('users').doc(uid).set({
                email: email,
                uid: uid,
                name: form.name.value,
                phone: form.phone.value,
                description: form.description.value,
            }).then(function(){
                setTimeout(function() {
                    location.href = "home.html";
                }, 1);
            }).catch(function(error){
                
            })
        })
    }

    function readUserData() {
        firebase.firestore().collection("users").doc(uid).get().then(function(doc) {
            if (doc.exists) {

                var nameHTML = doc.data().name;
                var emailHTML = doc.data().email;
                var phoneHTML = doc.data().phone;
                var descriptionHTML = doc.data().description;

                document.getElementById("nameHTML").innerText = nameHTML;
                document.getElementById("emailHTML").innerText = emailHTML;
                document.getElementById("phoneHTML").innerText = phoneHTML;
                document.getElementById("descriptionHTML").innerText = descriptionHTML;

            } else {
                alert("No such document!");
            }
        }).catch(function(error) {
            alert("Error getting document:", error);
        });
    }


    mainApp.logOut = logOut;
    mainApp.saveUser = saveUser;
    mainApp.readUserData = readUserData;
})()