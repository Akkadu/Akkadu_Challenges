import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCUOjkRDDucTATCahNfds4MFyUWbsJ_Qto",
    authDomain: "reactchatroom-698b9.firebaseapp.com",
    databaseURL: "https://reactchatroom-698b9-default-rtdb.firebaseio.com",
    projectId: "reactchatroom-698b9",
    storageBucket: "reactchatroom-698b9.appspot.com",
    messagingSenderId: "359951317746",
    appId: "1:359951317746:web:0842456d708134be5c6e6b"
})

const db = firebaseApp.firestore()

export { db }