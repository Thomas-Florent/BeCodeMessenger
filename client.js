const firebaseConfig = {
    apiKey: "AIzaSyDMXZN-T8Iu4Ki_bp8CpioVec5T7IgyilE",
    authDomain: "becodechat-c74d4.firebaseapp.com",
    databaseURL: "https://becodechat-c74d4.firebaseio.com",
    projectId: "becodechat-c74d4",
    storageBucket: "",
    messagingSenderId: "668552066402",
    appId: "1:668552066402:web:de6af68cb06f5e49"
};

firebase.initializeApp(firebaseConfig);

function login() {
    var provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(user);
    }).catch(function (error) {
        var errorMessage = error.message;
        console.log(errorMessage);

    });

}
$('#log').on('click', login);