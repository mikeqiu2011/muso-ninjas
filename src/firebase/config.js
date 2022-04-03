import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBo3FEKHAXlxMmmxZS33XSW8sC2AplXnQY",
    authDomain: "muso-ninjas-409e9.firebaseapp.com",
    projectId: "muso-ninjas-409e9",
    storageBucket: "muso-ninjas-409e9.appspot.com",
    messagingSenderId: "690692584397",
    appId: "1:690692584397:web:4181ef32405b5ed4fa4a84"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init different services
const auth = firebase.auth()
const db = firebase.firestore()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { auth, db, timestamp }