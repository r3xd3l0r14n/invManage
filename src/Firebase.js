import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
const config = {
    apiKey: "AIzaSyAx_L5JG5qsEdAI_9qYwM-iXsb14UZJsyg",
    authDomain: "crud-simple-a55e8.firebaseapp.com",
    databaseURL: "https://crud-simple-a55e8.firebaseio.com",
    projectId: "crud-simple-a55e8",
    storageBucket: "crud-simple-a55e8.appspot.com",
    messagingSenderId: "54621341829",
    appId: "1:54621341829:web:e4df721b2fefa1748181ec",
    measurementId: "G-W57F0TZKSV"
}

firebase.initializeApp(config)

export default firebase