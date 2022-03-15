import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAygF-ZMpd2Oi23hEJMWiIsdFTUaW94Mls",
    authDomain: "instagram-clone-react-629ea.firebaseapp.com",
    projectId: "instagram-clone-react-629ea",
    storageBucket: "instagram-clone-react-629ea.appspot.com",
    messagingSenderId: "604120224111",
    appId: "1:604120224111:web:34eee0dacc83c193ed989a",
    measurementId: "G-WQRCP17WZ1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();



export { db, auth, storage }



