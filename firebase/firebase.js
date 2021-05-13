import * as firebase from 'firebase'

//Include firebase project details
firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
}) 

export default firebase;
