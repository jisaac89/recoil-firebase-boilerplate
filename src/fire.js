import * as firebase from 'firebase'

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyD--ZOpXkFn3_lBWw-RIryK-lTReY09XFo",
    authDomain: "recoil-f30a0.firebaseapp.com",
    databaseURL: "https://recoil-f30a0.firebaseio.com",
    projectId: "recoil-f30a0",
    storageBucket: "recoil-f30a0.appspot.com",
    messagingSenderId: "162225760780"
};

var fire = firebase.initializeApp(config);
export default fire;